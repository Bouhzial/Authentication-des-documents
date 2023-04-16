import React from 'react'
import SideNav from '../../components/sidenav'
import UserForm from '../../components/recteur/users/utilisateurform'

type Props = {
    children: JSX.Element
}

const options = [{ name: "Voir Diplomes", link: "/issuer/voir_diplomes" }, { name: "Créer Diplomes", link: "/issuer/creer_diplome" }, { name: "Gérer Etudiants", link: "/issuer/gerer_etudiants" }]

export default function IssuerLayout ({ children }: Props) {
    return (
        <div className='flex'>
            <SideNav name="Mohamed" image_link="/Rafik.jpg" options={options} />
            {children}
        </div>
    )
}
