import React from 'react'
import SideNav from '../components/sidenav'
import UserDashBoard from '../components/recteur/users/Userboard'
import UserForm from '../components/recteur/users/utilisateurform'
import { useSession } from 'next-auth/react';
import DiplomeView from '../components/recteur/diplomes/diplomeview';


export default function index () {
  const { data: session, status } = useSession();
  console.log(session, status);
  const user = {
    name: "Mohamed",
    imagelink: "/Rafik.jpg",
  }
  return (
    <div>
      <main className='flex'>
        <SideNav name={user.name} image_link={user.imagelink} options={[{ name: "Gerer Utilisateurs", link: "/" }, { name: "Creer Utilisateur", link: "./create_users" }, { name: "Verifier Diplomes", link: "verifier_diplome" }]} />
        <UserDashBoard />
      </main>
    </div>
  )
}




