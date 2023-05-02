import { Diplome, Etudiant, PrismaClient } from '@prisma/client';
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { CONTRACT_ABI, CONTRACT_ADDRESS, CONTRACT_OWNER, WEB3_API } from './constants';
import { encryptData } from './encryption-helper';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const prisma = new PrismaClient()

let web3 = new Web3(new Web3.providers.HttpProvider(WEB3_API))




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

    //generate the diploma hash using the diploma data and keccak256
    const diplomaHash = web3.utils.keccak256(JSON.stringify(diploma));

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

    try {
        await contract.methods.createDiploma(diplomaHash, {
            studentName: `${prenom} ${nom}`,
            birthDate: `${date_naissance}, ${lieu_naissance}`,
            diplomaType: diplome?.type,
            dateOfIssue: `${diplome?.date_obtention.toISOString().slice(0, 10)}`,
            speciality: diplome?.student?.CursusUniversitaire[0]?.specialite
        }).send({
            from: CONTRACT_OWNER, gas: "150000"
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
                digitalCertificatePath: fileName
            }
        })

    } catch (e) {
        console.log(e)
        throw new Error(`Diploma with id ${id} has encoutered an error while being created in the blockchain`);
    }

}
