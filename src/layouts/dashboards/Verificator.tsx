import React from 'react'
import SideNav from '../../components/sidenav'
import UserForm from '../../components/recteur/users/utilisateurform'

type Props = {
    children: JSX.Element
}

const options = [{ name: "Verifier Diplomes", link: "/verificator/verifier_diplome" }]

export default function VerificatorLayout ({ children }: Props) {
    return (
        <div className='flex'>
            <SideNav name="Mohamed" image_link="/Rafik.jpg" options={options} />
            {children}
        </div>
    )
}
