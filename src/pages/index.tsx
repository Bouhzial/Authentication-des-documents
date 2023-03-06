
import { log } from 'console';
import { useRouter } from 'next/router';
import React from 'react'
import SideNav from '../../components/sidenav'
import UserDashBoard from '../../components/Userboard'
import UserForm from '../../components/utilisateurform'
import { api } from '../utils/api';
interface Props {
  users: any;
}
interface User {
  nom: string;
  role: string;
  email: string;
  matricule: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  telephone: string;
  image: string;
  //add the other user fields
}
export default function index() {
  const users= api.users.getUsers.useQuery().data!;
  return (
    <div>
      <main className='flex'>
      <SideNav name="Mohamed" image_link="/Rafik.jpg" option1="Gérer Utilisateur" option2="Gérer Etudiants"/>
      <div className='w-5/6 h-screen pb-4 flex'>
        <UserForm/>
        <UserDashBoard data={users}/>
      </div>
      
      </main>
      </div>
  )
}

      


