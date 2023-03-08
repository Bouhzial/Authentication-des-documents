import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Search from './search'
import {useEffect} from 'react'

interface User {
  nom: string;
  role: string;
  email: string;
  matricule: number;
  prenom: string;
  date_naissance: string;
  leui_naissance: string;
  telephone: number;
  image: {
    name: string;
    size: number;
    lastModified: number;
    type: string;
  };
  //add the other user fields
}
interface Props {
  data: User[];
}
interface SearchedObejct {
  serached: string;
  type: string;
}


export default function UserDashBoard({data}:Props) {
  
  const [search,setSearch] = React.useState<SearchedObejct>({
    serached:'',
    type:'',
  })  
  
  const [seachedData,setSeachedData] = React.useState<User[]>(data);
  
 
  function searchData() {
    console.log(search.serached);
    if(search.serached.length>0){
      const newData = data.filter((user:User) => {
        if(search.type=='nom'){
          return user.nom.toLowerCase().includes(search.serached.toLowerCase())||user.prenom.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='role'){
          return user.role.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='email'){
          return user.email.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if(search.type=='matricule'){
          return user.matricule.toString().toLowerCase().includes(search.serached.toLowerCase())
        }
        else{
          return user.nom.toLowerCase().includes(search.serached.toLowerCase())
        }
      })
      setSeachedData(newData)    
    }
    else{
      setSeachedData(data)
    }
  }

function Edit(user:User) {
  //make a modal to edit the user

}
function Delete(user:User) {
  //make a modal to delete the user
  
}


  
  return (
    <div className='m-8 flex flex-col items-center w-4/5'>
      <div className='flex items-center justify-between w-full'>
      <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Les Utilisateurers </h1>
       <Search change={(val:SearchedObejct) => {setSearch(val);searchData()}}/>
      </div>
      <div className='w-full'>
        <table className="w-full mt-8">
          <thead>
            <tr className="h-16 border-b border-gray-200 font-lg text-gray-400">
              <th className="text-left pl-4 ">Nom</th>
              <th className="text-left pl-4 ">Role</th>
              <th className="text-left pl-4 ">Email</th>
              <th className="text-left pl-4 ">Matricule</th>
              <th/>
              <th/>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {data && data.map((user:User) => {
              return (
            <tr className="h-16">
              <td className="pl-4 ">{user.nom +" "+ user.prenom}</td>
              <td className="pl-4 ">{user.role}</td>
              <td className="pl-4 ">{user.email}</td>
              <td className="pl-4">{user.matricule}</td>
              <td onClick={()=>{Edit(user)}} className="pl-4 text-blue-600 cursor-pointer">EDIT </td>
              <td onClick={()=>{Delete(user)}} className="pl-4 text-red-600 cursor-pointer">DELETE </td>
            </tr>
              )})}
            </tbody>
          </table>
      </div>
    </div>
  )
}

