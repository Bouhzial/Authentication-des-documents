import React from 'react'
import SideNav from '../components/sidenav'
import UserDashBoard from '../components/Userboard'
import UserForm from '../components/utilisateurform'
import { api } from '../utils/api';


export default function index () {
  return (
    <div>
      <main className='flex'>
        <SideNav name="Mohamed" image_link="/Rafik.jpg" options={[{ name: "Gerer Utilisateurs", link: "/" }, { name: "Creer Utilisateur", link: "./create_users" }, { name: "Verifier Diplomes", link: "verifier_diplome" }]} />
        <UserDashBoard />
      </main>
    </div>
  )
}




