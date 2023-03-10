import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Search from './generic/search'
import {useEffect} from 'react'
import Useredit from './editing/useredit'
import UserDelete from './deleting/userDelete'
import { SearchedObejct, User } from '../types'
import { api } from '../src/utils/api'





export default function UserDashBoard() {
  const data= api.users.getUsers.useQuery().data!;
  
  const [search,setSearch] = React.useState<SearchedObejct>({
    serached:'',
    type:'',
  })  
  
  const [seachedData,setSeachedData] = React.useState<User[]>(data);
  
 useEffect(() => {
    setSeachedData(data)
  }, [data])

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
const emptyUser:User = {
  id: "",
  nom: "",
  role: "",
  email: "",
  matricule: 0,
  prenom: "",
  date_naissance: "",
  leui_naissance: "",
  telephone: 0,
  image: {
    name: "",
    size: 0,
    lastModified: 0,
    type: "",}
    
  }
const [editedUser,setEditedUser] = React.useState<User>(emptyUser)
const [DeletedUser,setDeletedUser] = React.useState<User>(emptyUser)

const [editVisible,setEditVisible] = React.useState(false);
const [deleteVisble,setdeleteVisble] = React.useState(false)

function Edit(user:User) {
  setEditedUser(user);
  setEditVisible(true);
}

function Delete(user:User) {
  setDeletedUser(user)
  setdeleteVisble(true)
}


  return (
    <div className='m-8 flex flex-col items-center w-4/5'>
      <div className='flex items-center justify-between w-full'>
      <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Gerer Les Utilisateurers</h1>
       <Search fileds={["nom","role","email","matricule"]} change={(val:SearchedObejct) => {setSearch(val);searchData()}}/>
      </div>
      <div className='w-full'>
        <table className="w-full mt-8">
          <thead>
            <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
              <th className="text-left pl-4 ">Nom</th>
              <th className="text-left pl-4 ">Role</th>
              <th className="text-left pl-4 ">Email</th>
              <th className="text-left pl-4 ">Matricule</th>
              <th/>
              <th/>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {seachedData && seachedData.map((user:User) => {
              return (
            <tr className="h-16 border-b border-gray-200">
              <td className="pl-4 ">{user.nom +" "+ user.prenom}</td>
              <td className="pl-4 ">{user.role}</td>
              <td className="pl-4 ">{user.email}</td>
              <td className="pl-4">{user.matricule}</td>
              <td onClick={()=>{Edit(user)}} className="pl-4 text-blue-600 cursor-pointer">MODIFIE</td>
              <td onClick={()=>{Delete(user)}} className="pl-4 text-red-600 cursor-pointer">SIPPRIMER</td>
            </tr>
              )})}
            </tbody>
          </table>
      </div>
      {editVisible && <Useredit checkvisible={(val) => {setEditVisible(val)}} user={editedUser}/>}
      {deleteVisble && <UserDelete checkvisible={(val) => {setdeleteVisble(val)}} user={DeletedUser}/>}
    </div>
  )
}

