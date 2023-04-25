import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import toast from 'react-hot-toast';
import { SearchedObejct } from '../../../types/types';
import { api } from '../../../utils/api';
import Search from '../../generic/search';

export default function StudentsTable () {

    const studentsDataQuery = api.issuer.students.GetSuccesfulStudents.useQuery();
    const createDiplomasMutation = api.issuer.diplomas.CreateDiploma.useMutation();
    const createDiploma = async (id: number) => {
        try {
            await createDiplomasMutation.mutateAsync(id)
            toast.success("Diplome crée avec succés en attendant la validation , un email a été envoyé au etudiant")
        } catch (e) {
            toast.error("Erreur lors de la création du diplome")
        }
    }


    const [search, setSearch] = React.useState<SearchedObejct>({
        serached: '',
        type: '',
    })
    return (

        <div className='m-8 flex flex-col h-full w-full items-center'>
            <div className='flex items-center justify-between w-full'>
                <div>
                    <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Créer Les Diplomes</h1>
                    <p className='text-sm text-gray-500'>Vous trouvez ici les etudiants qui ont validé leur année</p>
                </div>
                <Search fileds={["nom", "type", "date", "speciality", "departement"]} change={(val: SearchedObejct) => { setSearch(val) }} />
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
                        {studentsDataQuery.isSuccess && studentsDataQuery.data.map(({ id, matricule, nom, prenom, CursusUniversitaire }) => (
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
