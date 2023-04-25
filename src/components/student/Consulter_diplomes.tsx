import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { api } from '../../utils/api';
import { SearchedObejct } from '../../types/types';
import { CursusUniversitaire, Diplome, Etudiant } from '@prisma/client';
import Search from '../generic/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ViewDiplome from '../generic/DiplomeModal';

export default function ConsulterDiplomes() {
    const {data:session} = useSession()
    console.log(session);
    const diplomas = api.student.diplomas.GetDiplomasByUserEmail.useQuery(session?.user!.email!).data!;
    const [view, setView] = useState(false);
    const [diplome, setDiplome] = useState<Diplome & {
        student: Etudiant & {
            CursusUniversitaire: CursusUniversitaire[];
        }
    }>();
  return (
    <div className='p-8 flex h-screen flex-col items-center w-4/5'>
    <div className='flex items-center justify-between w-full'>
      <div>
        <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Consulter Les Diplomes</h1>
        <p className='text-sm text-gray-500'>Vous trouvez ici votre diplomes obtunu</p>
      </div>
    </div>
    <div className='w-full'>
      <table className="w-full mt-8">
        <thead>
          <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
            <th className="text-left pl-4 ">Type</th>
            <th className="text-left pl-4 ">Date</th>
            <th className="text-left pl-4 ">Speciality</th>
            <th className="text-left pl-4 ">Moyenne</th>
          </tr>
        </thead>
        <tbody className='font-medium'>
            {diplomas && diplomas.map((diplome: (Diplome & {student: Etudiant & {CursusUniversitaire: CursusUniversitaire[];}})) => (
            <tr className="h-16 border-b border-gray-200">
                <td className="pl-4">{diplome.student.CursusUniversitaire[0]?.niveau===3?"Licence":"Master" }</td>
                <td className="pl-4">{diplome.date_obtention.toDateString()}</td>
                <td className="pl-4">{diplome.student.CursusUniversitaire[0]?.specialite}</td>
                <td className="pl-4">{diplome.student.CursusUniversitaire[0]?.moyenne_annuelle?.toString()}</td>
                <td onClick={() => { setDiplome(diplome); setView(true) }} className="text-left  cursor-pointer pl-4 ">
                    <FontAwesomeIcon icon={faEye} />
                  </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    {(view && diplome) && <ViewDiplome diplome={diplome} close={() => { setView(false) }} />}
    </div>
  )
}
