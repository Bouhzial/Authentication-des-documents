import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Search from './generic/search'
import { useEffect } from 'react'
import Useredit from './editing/useredit'
import UserDelete from './deleting/userDelete'
import { SearchedObejct, User } from '../types/types'
import { api } from '../utils/api'


const emptyUser: User = {
  id: 0,
  nom: "",
  role_id: 0,
  email: "",
  matricule: "",
  prenom: "",
  date_naissance: "",
  leui_naissance: "",
  telephone: "",
  faculty_id: 0,
  departement_id: 0
}


export default function UserDashBoard () {
  const usersData = api.recteur.users.getUsers.useQuery().data!;

  const [search, setSearch] = React.useState<SearchedObejct>({
    serached: '',
    type: '',
  })

  const [seachedData, setSeachedData] = React.useState(usersData);

  useEffect(() => {
    setSeachedData(usersData)
  }, [usersData])

  function searchData () {
    console.log(search.serached);
    if (search.serached.length > 0) {
      const newData = usersData.filter((user) => {
        if (search.type == 'nom') {
          return user.nom.toLowerCase().includes(search.serached.toLowerCase()) || user.prenom.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if (search.type == 'role') {
          if (getRole(user.role_id).toLowerCase().includes(search.serached.toLowerCase())) {
            return user
          }
        }
        else if (search.type == 'email') {
          return user.email.toLowerCase().includes(search.serached.toLowerCase())
        }
        else if (search.type == 'matricule') {
          return user.matricule.toString().toLowerCase().includes(search.serached.toLowerCase())
        }
        else {
          return user.nom.toLowerCase().includes(search.serached.toLowerCase())
        }
      })
      setSeachedData(newData)
    }
    else {
      setSeachedData(usersData)
    }
  }

  const [editedUser, setEditedUser] = React.useState<User>(emptyUser)
  const [DeletedUser, setDeletedUser] = React.useState<User>(emptyUser)

  const [editVisible, setEditVisible] = React.useState(false);
  const [deleteVisble, setdeleteVisble] = React.useState(false)

  function Edit (user: User) {
    setEditedUser(user);
    setEditVisible(true);
  }

  function Delete (user: User) {
    setDeletedUser(user)
    setdeleteVisble(true)
  }
  function getRole (id: number) {
    if (id == 1) {
      return "recteur"
    }
    else if (id == 2) {
      return "chef departement"
    }
    else if (id == 3) {
      return "doyen"
    }
    else if (id == 4) {
      return "etudiant"
    }
    return "inconnu"
  }

  return (
    <div className='p-8 flex h-screen flex-col items-center w-4/5  '>
      <div className='flex items-center justify-between w-full'>
        <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Gerer Les Utilisateurers</h1>
        <Search fileds={["nom", "role", "email", "matricule"]} change={(val: SearchedObejct) => { setSearch(val); searchData() }} />
      </div>
      <div className='w-full mt-8 h-[90%] overflow-y-scroll scrollbar-thin scrollbar-track-link-text-blue'>
        <table className="w-full   ">
          <thead>
            <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
              <th className="text-left pl-4 ">Nom</th>
              <th className="text-left pl-4 ">Role</th>
              <th className="text-left pl-4 ">Email</th>
              <th className="text-left pl-4 ">Matricule</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody className='font-medium'>
            {seachedData && seachedData.map((user) => {
              return (
                <tr className="h-16 border-b border-gray-200">
                  <td className="pl-4 ">{user.nom + " " + user.prenom}</td>
                  <td className="pl-4 ">{getRole(user.role_id)}</td>
                  <td className="pl-4 ">{user.email}</td>
                  <td className="pl-4">{user.matricule}</td>
                  <td onClick={() => { Edit(user as User) }} className="pl-4 text-blue-600 cursor-pointer">Modifier</td>
                  <td onClick={() => { Delete(user as User) }} className="pl-4 text-red-600 cursor-pointer">Supprimer</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {editVisible && <Useredit checkvisible={(val) => { setEditVisible(val) }} user={editedUser} />}
      {deleteVisble && <UserDelete checkvisible={(val) => { setdeleteVisble(val) }} user={DeletedUser} />}
    </div>
  )
}

