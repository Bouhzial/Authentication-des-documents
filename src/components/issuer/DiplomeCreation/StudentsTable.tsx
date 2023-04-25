import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { SearchedObejct } from '../../../types/types';
import { api } from '../../../utils/api';
import Search from '../../generic/search';
import { CursusUniversitaire, Etudiant } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';

export default function StudentsTable (/*params: InferGetServerSidePropsType<typeof getServerSideProps>*/) {
    const {data:session} = useSession()
    const studentsDataQuery = api.issuer.students.GetSuccesfulStudents.useQuery(session?.user!.departement_id!).data!;
    const [seachedData, setSeachedData] = React.useState(studentsDataQuery);

    useEffect(() => {
        setSeachedData(studentsDataQuery)
    }, [studentsDataQuery])
    const createDiplomasMutation = api.issuer.diplomas.CreateDiploma.useMutation();
    const createDiploma = async (id: number) => {
        try {
            await createDiplomasMutation.mutateAsync(id)
            toast.success("Diplome crée avec succés en attendant la validation , un email a été envoyé au etudiant")
            //send email to student to notifie him
        } catch (e) {
            toast.error("Erreur lors de la création du diplome")
        }
    }


    const [search, setSearch] = React.useState<SearchedObejct>({
        serached: '',
        type: 'nom',
    })

    function SearchData(){
        if (search.serached.length > 0) {
        const newData = studentsDataQuery.filter((student: Etudiant & {
            CursusUniversitaire: CursusUniversitaire[];
          }) => {
            if (search.type == 'nom') {
                return student.nom.toLowerCase().includes(search.serached.toLowerCase()) || student.prenom.toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'matricule') {
                return student.matricule.toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'annee') {
                return student.CursusUniversitaire[0]?.niveau.toString().toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'filiere') {
                return student.CursusUniversitaire[0]?.filiere!.toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'specialite') {
                return student.CursusUniversitaire[0]?.specialite!.toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'section') {
                return student.CursusUniversitaire[0]?.section.toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'groupe') {
                return student.CursusUniversitaire[0]?.groupe.toLowerCase().includes(search.serached.toLowerCase())
            }
            else if (search.type == 'moyenne') {
                return student.CursusUniversitaire[0]?.moyenne_annuelle?.toString().toLowerCase().includes(search.serached.toLowerCase())
            }
        })
        setSeachedData(newData)
    }
    else {
      setSeachedData(studentsDataQuery)
    }
        

    }

    return (

        <div className='m-8 flex flex-col h-full w-full items-center'>
            <div className='flex items-center justify-between w-full'>
                <div>
                    <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Créer Les Diplomes</h1>
                    <p className='text-sm text-gray-500'>Vous trouvez ici les etudiants qui ont validé leur année</p>
                </div>
                <Search fileds={["nom", "matricule","annee" , "filiere" , "specialite" , "section" , "groupe", "moyenne"]} change={(val: SearchedObejct) => { setSearch(val) ; SearchData()}} />
            </div>
            <div className='w-full'>
                <table className="w-full mt-8">
                    <thead>
                        <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
                            <th className="text-left pl-4 ">Nom</th>
                            <th className="text-left pl-4 ">Matricule</th>
                            <th className="text-left pl-4 ">Année</th>
                            <th className="text-left pl-4 ">Filiere</th>
                            <th className="text-left pl-4 ">Specialité</th>
                            <th className="text-left pl-4 ">Section</th>
                            <th className="text-left pl-4 ">Groupe</th>
                            <th className="text-left pl-4 ">Moyenne annuelle</th>
                            <th />
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody className='font-medium'>
                        {seachedData && seachedData.map(({ id, matricule, nom, prenom, CursusUniversitaire }) => (
                            <tr className="h-16 text-md border-b border-gray-200">
                                <td className="text-left pl-4 ">{prenom + " " + nom}</td>
                                <td className="text-left pl-4 ">{matricule}</td>
                                <td className="text-left pl-4 ">{CursusUniversitaire[0]?.niveau == 3 ? "L3" : "M2"}</td>
                                <td className="text-left pl-4 ">{CursusUniversitaire[0]?.filiere}</td>
                                <td className="text-left pl-4 ">{CursusUniversitaire[0]?.specialite}</td>
                                <td className="text-left pl-4 ">{CursusUniversitaire[0]?.section}</td>
                                <td className="text-left pl-4 ">{CursusUniversitaire[0]?.groupe}</td>
                                <td className="text-left pl-4 ">{Number(CursusUniversitaire[0]?.moyenne_annuelle)}</td>
                                <td onClick={() => { createDiploma(id) }} className="text-left text-green-700 cursor-pointer pl-4 ">Créer </td>
                                <td onClick={() => { }} className="text-left text-red-600 cursor-pointer pl-4 ">Refuser </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
// export async function getServerSideProps (){
//     console.log("getServerSideProps");
    
//     const session = await getSession()
//     console.log("session",session);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false
//             }
//         }
//     }
//     return {
//         props: {
//             session
//         }
//     }
// }