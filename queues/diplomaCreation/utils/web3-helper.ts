import { Diplome, Etudiant, PrismaClient } from '@prisma/client';
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { CONTRACT_ABI, CONTRACT_ADDRESS, CONTRACT_OWNER, WEB3_API } from './constants';
import { encryptData } from './encryption-helper';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary'
const prisma = new PrismaClient()

let web3 = new Web3(new Web3.providers.HttpProvider(WEB3_API))

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const contract = new web3.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);



export const checkIfDiplomaExists = async (diplomaId: number) => {
    const diploma = await prisma.diplome.findUnique({
        where: {
            id: diplomaId
        }
    })
    return diploma
}


export const createDiplomaContractCall = async (diploma: Diplome) => {
    const { id } = diploma;

    const diplome = await prisma.diplome.findUnique({
        where: {
            id
        },
        include: {
            student: {
                include: {
                    CursusUniversitaire: {
                        include: {
                            annee: true,
                            departement: true,
                            faculty: true
                        },
                        where: {
                            annee: {
                                isCurrent: true
                            }
                        }
                    }
                }
            }
        }
    });

    const folder = path.join(__dirname, '../../../public/uploads/diplomes');
    if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
    }
    const fileName = `${Date.now()}-${diplome?.student.matricule}.usthb`
    writeFileSync(path.join(folder, fileName), encryptData(JSON.stringify(diploma)));

    console.log("nikmok")
    //upload the diploma to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(path.join(folder, fileName), {
        resource_type: "raw",
        public_id: `diplomas/${fileName}`,
        overwrite: true
    });

    //generate the diploma hash using the diploma data and keccak256
    const diplomaHash = web3.utils.keccak256(JSON.stringify(diploma));

    console.log("HASHED RAW DATA :", encryptData(JSON.stringify(diploma)))

    console.log(diplomaHash);

    //call the contract method to create a new diploma
    const { nom, prenom, date_naissance, lieu_naissance } = diplome?.student as Etudiant

    console.log(
        {
            studentName: `${prenom} ${nom}`,
            birthDate: `${date_naissance}, ${lieu_naissance}`,
            diplomaType: diplome?.type,
            dateOfIssue: `${diplome?.date_obtention.toISOString().slice(0, 10)}`,
            speciality: diplome?.student?.CursusUniversitaire[0]?.specialite
        }
    )

    console.log("NA3ADIN RBK")


    try {
        let contractOwner = CONTRACT_OWNER;
        if (process.env.PRIVATE_KEY_OWNER) {
            const signer = web3.eth.accounts.privateKeyToAccount(
                process.env.PRIVATE_KEY_OWNER
            );
            web3.eth.accounts.wallet.add(signer);
            contractOwner = signer.address
        }

        const method = contract.methods.createDiploma(diplomaHash, {
            studentName: `${prenom} ${nom}`,
            birthDate: `${date_naissance}, ${lieu_naissance}`,
            diplomaType: diplome?.type,
            dateOfIssue: `${diplome?.date_obtention.toISOString().slice(0, 10)}`,
            speciality: diplome?.student?.CursusUniversitaire[0]?.specialite
        })
        const estimatedGas = await method.estimateGas({
            from: contractOwner
        })
        console.log(estimatedGas)
        await method
            .send({
                from: contractOwner,
                gas: estimatedGas
            })
        //encrypt the diploma hash using the AES encryption algorithm
        const diplomaHashEncrypted = encryptData(diplomaHash)
        console.log(diplomaHashEncrypted)
        console.log(fileName)
        //update the encrypted diploma hash in the database
        await prisma.diplome.update({
            where: {
                id
            },
            data: {
                encrypted_hash: diplomaHashEncrypted,
                digitalCertificatePath: cloudinaryResponse.secure_url
            }
        })

    } catch (e) {
        console.log(e)
        throw new Error(`Diploma with id ${id} has encoutered an error while being created in the blockchain`);
    }

}
