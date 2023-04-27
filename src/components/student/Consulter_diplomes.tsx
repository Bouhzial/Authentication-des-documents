import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { api } from '../../utils/api';
import { CursusUniversitaire, Diplome, Etudiant } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import ViewDiplome from '../generic/DiplomeModal';
import DiplomaTemplate from './DiplomaTemplate';

export default function ConsulterDiplomes () {
  const { data: session } = useSession()
  console.log(session);
  const diplomas = api.student.diplomas.GetDiplomasByUserEmail.useQuery(session?.user!.email!).data!;
  const [view, setView] = useState(false);
  const [diplome, setDiplome] = useState<Diplome & {
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  }>();
  const Departements = api.etablisments.GetDepartements.useQuery().data!;

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
              <th className="text-left pl-4 ">Status</th>
              <th className="text-left pl-4 ">Fichier .usthb</th>
              <th className="text-left pl-4 ">Voir diplome</th>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {diplomas && diplomas.map((diplome: (Diplome & { student: Etudiant & { CursusUniversitaire: CursusUniversitaire[]; } })) => (
              <tr className="h-16 border-b border-gray-200">
                <td className="pl-4">{diplome.student.CursusUniversitaire[0]?.niveau === 3 ? "Licence" : "Master"}</td>
                <td className="pl-4">{diplome.date_obtention.toDateString()}</td>
                <td className="pl-4">{diplome.student.CursusUniversitaire[0]?.specialite}</td>
                <td className="pl-4">
                  {diplome.signedByDoyen && diplome.signedByRector ?
                    <p className="text-white bg-link-text-blue rounded-[5px] py-1 text-center w-24">Validé</p> :
                    <p className="text-white bg-[#00bdfe] rounded-[5px] py-1 text-center w-24">En Attente</p>
                  }
                </td>
                {diplome.signedByDoyen && diplome.signedByRector ?
                  <td className="text-left  cursor-pointer pl-4 ">
                    <a href={`/uploads/diplomes/${diplome.digitalCertificatePath}`} >
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </td>
                  : ''}
                {diplome.signedByDoyen && diplome.signedByRector ?
                  <td onClick={() => { setDiplome(diplome); setView(true) }} className="text-left  cursor-pointer pl-4 ">
                    <FontAwesomeIcon icon={faEye} />
                  </td>
                  : ''}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(view && diplome) && <DiplomaTemplate departements={Departements} diplome={diplome} close={() => { setView(false) }} />}
    </div>
  )
}
