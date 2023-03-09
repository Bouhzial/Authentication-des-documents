import React from 'react'
import SideNav from '../../../components/sidenav'

export default function verifier_diplome() {
  return (
    <div className='flex'>
      <SideNav name="Mohamed" image_link="/Rafik.jpg" options={[{name:"Gerer Utilisateurs",link:"./gerer_users"},{name:"Creer Utilisateur",link:"./create_users"},{name:"Verifier Diplomes",link:"verifier_diplome"}]}/>
    </div>
  )
}
