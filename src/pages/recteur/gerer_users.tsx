import React from 'react'
import SideNav from '../../../components/sidenav'
import UserDashBoard from '../../../components/Userboard'
import { api } from '../../utils/api';

export default function gerer_users() {
  const users= api.users.getUsers.useQuery().data!;
  return (
    <div className='flex'>
        <SideNav name="Mohamed" image_link="/Rafik.jpg" options={[{name:"Gerer Utilisateurs",link:"./gerer_users"},{name:"Creer Utilisateur",link:"./create_users"},{name:"Verifier Diplomes",link:"verifier_diplome"}]}/>
        <UserDashBoard data={users}/>
    </div>
  )
}
