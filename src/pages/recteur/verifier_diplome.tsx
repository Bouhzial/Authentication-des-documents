import React from 'react'
import DiplomeView from '../../../components/diplomeview'
import SideNav from '../../../components/sidenav'

export default function verifier_diplome() {
  return (
    <div className='flex w-full'>
      <SideNav name="Mohamed" image_link="/Rafik.jpg" options={[{name:"Gerer Utilisateurs",link:"./gerer_users"},{name:"Creer Utilisateur",link:"./create_users"},{name:"Verifier Diplomes",link:"verifier_diplome"}]}/>
      <DiplomeView/>
    </div>
  )
}
