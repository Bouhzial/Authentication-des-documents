import React from 'react'
import SideNav from '../../components/sidenav'
import UserDashBoard from '../../components/Userboard'
import UserForm from '../../components/utilisateurform'
import { api } from '../utils/api';


export default function index() {
  const users= api.users.getUsers.useQuery().data!;
  return (
    <div>
      <main className='flex'>
      <SideNav name="Mohamed" image_link="/Rafik.jpg" option1="Gérer Utilisateur" option2="Gérer Etudiants"/>
        <UserForm/>
        <UserDashBoard data={users}/>
      </main>
      </div>
  )
}

      


