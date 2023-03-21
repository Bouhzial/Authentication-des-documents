import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { api } from '../../src/utils/api';
import { Diplome, SearchedObejct } from '../../types';
import ViewDiplome from '../diplome/viewdiplome';
import Search from '../generic/search';

export default function DiplomeView() {
  const data = api.diplomes.getDiplomes.useQuery().data!
  const validate = api.diplomes.doyenValiderDiplome.useMutation() 
  const refusing = api.diplomes.refuseDiplome.useMutation()
  const [view,setView] = React.useState(false)
  const [dipl, setDiplome] = React.useState<Diplome>({
    id: "",
    signedByDoyen: false,
    signedByPresident: false,
    date_obtention: "",
    student: {
      id: '',
    nom: '',
    prenom: '',
    matricule: 0,
    filiere: '',
    dipartement: '',
    typeDiplome: '',
    specialite: '',
    email: '',
    date_naissance: '',
    etablissement: '',
    leui_naissance: '',
    telephone: 0,
    image: {
      name: '',
      size: 0,
      lastModified: 0,
      type: '',
    }
    }
      
  })
  const [search,setSearch] = React.useState<SearchedObejct>({
    serached:'',
    type:'',
  })  
  const [seachedData,setSeachedData] = React.useState<Diplome[]>(data);
  function valider (diplome:Diplome){
    validate.mutate(diplome.id)
  }
  function refuse (diplome:Diplome){
    refusing.mutate(diplome.id)
  }
  function see (diplome:Diplome){
    setDiplome(diplome)
    setView(true)
  }
  useEffect(() => {
    setSeachedData(data)
  }, [data])
  function searchData() {
    console.log(search.serached);
    if(search.serached.length>0){
      const newData = data.filter((diplome:Diplome) => {
        if(search.type=='nom'){
          return diplome.student.nom.toLowerCase().includes(search.serached.toLowerCase())||diplome.student.prenom.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='type'){
          return diplome.student.typeDiplome.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='date'){
          return diplome.date_obtention.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='speciality'){
          return diplome.student.specialite.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='departement'){
          return diplome.student.dipartement.toLowerCase().includes(search.serached.toLowerCase())
        }
        else{
          return diplome.student.nom.toLowerCase().includes(search.serached.toLowerCase())
        }
      })
      setSeachedData(newData)   
    }
    else{
      setSeachedData(data)
    }
  }

  return (
   
        <div className='m-8 flex flex-col h-full w-full items-center'>
      <div className='flex items-center justify-between w-full'>
      <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Verifier Les Diplomes</h1>
       <Search fileds={["nom","type","date","speciality","departement"]} change={(val:SearchedObejct) => {setSearch(val);searchData()}}/>
      </div>
      <div className='w-full'>
        <table className="w-full mt-8">
          <thead>
            <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
              <th className="text-left pl-4 ">Nom</th>
              <th className="text-left pl-4 ">Type</th>
              <th className="text-left pl-4 ">Date</th>
              <th className="text-left pl-4 ">Speciality</th>
              <th className="text-left pl-4 ">Departement</th>
              <th/>
              <th/>
              <th/>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {seachedData && seachedData.map((diplome) => (         
              <tr className="h-16 text-md border-b border-gray-200">
                <td className="text-left pl-4 ">{diplome.student.nom+ " " + diplome.student.prenom}</td>
                <td className="text-left pl-4 ">{diplome.student.typeDiplome}</td>
                <td className="text-left pl-4 ">{diplome.date_obtention}</td>
                <td className="text-left pl-4 ">{diplome.student.specialite}</td>
                <td className="text-left pl-4 ">{diplome.student.dipartement}</td>
                {diplome.signedByDoyen ? <td className='text-left cursor-pointer pl-4 text-green-900 text-xl'><FontAwesomeIcon icon={faCheck} /></td> :<>
                <td onClick={()=>{valider(diplome)}} className="text-left text-green-700 cursor-pointer pl-4 ">VALIDER </td>
                <td onClick={()=>{refuse(diplome)}} className="text-left text-red-600 cursor-pointer pl-4 ">REFUSER </td>
                </>}
                <td onClick={()=>{see(diplome)}} className="text-left  cursor-pointer pl-4 ">
                   <FontAwesomeIcon icon={faEye} />
                </td>
              </tr>
           )) }

            </tbody>
          </table>
      </div>
      {view && <ViewDiplome diplome={dipl} close={()=>{setView(false)}}/>}
    </div>

  )
}
