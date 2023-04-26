import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../../utils/api'
import Search from '../../generic/search'
import { SearchedObejct } from '../../../types/types'
import { CursusUniversitaire, Diplome, Etudiant } from '@prisma/client'
import ViewDiplome from '../../generic/DiplomeModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default function DiplomeView () {
  const { data: session } = useSession()
  const diplomeData = api.issuer.diplomas.GetDiplomasByDepartementId.useQuery().data
  const [searchedData, setSearchedData] = React.useState<any>(diplomeData)
  const [search, setSearch] = React.useState<SearchedObejct>({
    serached: '',
    type: 'nom',
  })
  const [diplome, setDiplome] = useState<Diplome & {
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  }>()

  useEffect(() => {
    setSearchedData(diplomeData)
  }, [diplomeData])

  const [view, setView] = useState(false)
  const searchData = () => {
    if (search.serached.length > 0) {
      const newData = diplomeData?.filter((diplome: Diplome & {
        student: Etudiant & {
          CursusUniversitaire: CursusUniversitaire[];
        }
      }) => {
        if (search?.type == 'nom') {
          return diplome.student.nom.toLowerCase().includes(search?.serached.toLowerCase()) ||
            diplome.student.prenom.toLowerCase().includes(search?.serached.toLowerCase())
        }
        else if (search?.type == 'type') {
          return diplome.type.toLowerCase().includes(search?.serached.toLowerCase())
        }
        else if (search?.type == 'date') {
          return diplome.date_obtention.toString().toLowerCase().includes(search?.serached.toLowerCase())
        }
        else if (search?.type == 'speciality') {
          return diplome!.student!.CursusUniversitaire[0]!.specialite!.toLowerCase().includes(search?.serached.toLowerCase())
        }
        else if (search?.type == 'departement') {
          return diplome.student.CursusUniversitaire[0]?.moyenne_annuelle?.toString().toLowerCase().includes(search?.serached.toLowerCase())
        }
      })
      setSearchedData(newData)
    }
    else {
      setSearchedData(diplomeData)
    }
  }
  return (
    <div className='p-8 flex h-screen flex-col items-center w-4/5'>
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Consulter Les Diplomes</h1>
          <p className='text-sm text-gray-500'>Vous trouvez ici les diplomes de votre departement</p>
        </div>
        <Search fileds={["nom", "type", "date", "speciality", "moyenne"]} change={(val: SearchedObejct) => { setSearch(val); searchData() }} />
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
            </tr>
          </thead>
          <tbody className='font-medium'>
            {searchedData && searchedData.map((diplome: (Diplome & { student: Etudiant & { CursusUniversitaire: CursusUniversitaire[]; } })) => (
              <tr className="h-16 border-b border-gray-200">
                <td className="pl-4">{diplome.student.nom + " " + diplome.student.prenom}</td>
                <td className="pl-4">{diplome.student.CursusUniversitaire[0]?.niveau === 3 ? "Licence" : "Master"}</td>
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
