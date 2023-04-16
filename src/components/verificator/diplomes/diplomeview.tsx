import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { api } from '../../../utils/api';
import ViewDiplome from './DiplomeModal';
import Search from '../../generic/search';
import { CursusUniversitaire, Etudiant, Diplome } from '@prisma/client';
import toast from 'react-hot-toast';



export default function DiplomeView () {
  const getAllDiplomasQuery = api.verificator.diplomas.GetDiplomas.useQuery(1)
  //match the diplomes id with the student id

  const validateDiplomaMutation = api.verificator.diplomas.validateDiploma.useMutation()
  const refuseDiplomaMutation = api.verificator.diplomas.refuseDiploma.useMutation()


  const [diplome, setDiplome] = useState<Diplome & {
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  }>()

  const [view, setView] = useState(false)

  //validation and refusal functions
  const handleValidation = async (id: number) => {
    const confirmation = confirm("Voulez vous confirmez ce diplome ?")
    if (!confirmation) return

    try {
      await validateDiplomaMutation.mutateAsync(id)
      getAllDiplomasQuery.refetch()
      toast.success("Diplome validé avec succés")
    } catch (e) {
      toast.error("Erreur lors de la validation du diplome")
    }
  }

  const handleRefusal = async (id: number) => {
    //ask for confirmation before refusing
    const confirmation = confirm("Voulez vous vraiment refusez ce diplome ?")
    if (!confirmation) return

    try {
      await refuseDiplomaMutation.mutateAsync(id)
      getAllDiplomasQuery.refetch()
      toast.success("Diplome refusé avec succés")
    } catch (e) {
      toast.error("Erreur lors du refus du diplome")
    }
  }


  return (

    <div className='m-8 flex flex-col h-full w-full items-center'>
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Verifier Les Diplomes</h1>
          <p className='text-sm text-gray-500'>Vous trouvez ici les diplomes qui attendent votre validation</p>
        </div>
        {/* <Search fileds={["nom", "type", "date", "speciality", "departement"]} change={(val: SearchedObejct) => { setSearch(val); searchData() }} /> */}
      </div>
      <div className='w-full'>
        <table className="w-full mt-8">
          <thead>
            <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
              <th className="text-left pl-4 ">Nom</th>
              <th className="text-left pl-4 ">Type</th>
              <th className="text-left pl-4 ">Date</th>
              <th className="text-left pl-4 ">Speciality</th>
              <th className="text-left pl-4 ">Moyenne</th>
              <th />
              <th />
              <th />
            </tr>
          </thead>
          <tbody className='font-medium'>
            {getAllDiplomasQuery.isFetched && getAllDiplomasQuery?.data?.map((diplome) => (
              <tr className="h-16 text-md border-b border-gray-200">
                <td className="text-left pl-4 ">{diplome.student.prenom + " " + diplome.student.nom}</td>
                <td className="text-left pl-4 ">{diplome.type}</td>
                <td className="text-left pl-4 ">{diplome.date_obtention.toISOString()}</td>
                <td className="text-left pl-4 ">{diplome.student?.CursusUniversitaire[0]?.specialite}</td>
                <td className="text-left pl-4 ">{Number(diplome.student?.CursusUniversitaire[0]?.moyenne_annuelle)}</td>
                <td onClick={() => { handleValidation(diplome.id) }} className="text-left text-green-700 cursor-pointer pl-4 ">Valider </td>
                <td onClick={() => { handleRefusal(diplome.id) }} className="text-left text-red-600 cursor-pointer pl-4 ">Refuser </td>
                <td onClick={() => { setDiplome(diplome); setView(true) }} className="text-left  cursor-pointer pl-4 ">
                  <FontAwesomeIcon icon={faEye} />
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      {(view && diplome) && <ViewDiplome diplome={diplome} close={() => { setView(false) }} />}
    </div >

  )
}
