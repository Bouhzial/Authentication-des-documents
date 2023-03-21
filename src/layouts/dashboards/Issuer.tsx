import React from 'react'
import SideNav from '../../components/sidenav'
import UserForm from '../../components/utilisateurform'

type Props = {
    children: JSX.Element
}

const options = [{ name: "Gerer Utilisateurs", link: "./gerer_users" }, { name: "Creer Utilisateur", link: "./create_users" }, { name: "Verifier Diplomes", link: "verifier_diplome" }]

export default function IssuerLayout ({ children }: Props) {
    return (
        <div className='flex'>
            <SideNav name="Mohamed" image_link="/Rafik.jpg" options={options} />
            {children}
        </div>
    )
}
