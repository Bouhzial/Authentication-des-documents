import React from 'react'
import SideNav from '../../components/sidenav'
import UserForm from '../../components/recteur/users/utilisateurform'

type Props = {
    children: JSX.Element
}

const options = [{ name: "Gerer Utilisateurs", link: "/superadmin/gerer_users" }, { name: "Creer Utilisateur", link: "/superadmin/create_users" }, { name: "Verifier Diplomes", link: "/superadmin/verifier_diplome" }]

export default function SuperAdminLayout ({ children }: Props) {
    return (
        <div className='flex'>
            <SideNav name="Mohamed" image_link="/Rafik.jpg" options={options} />
            {children}
        </div>
    )
}
