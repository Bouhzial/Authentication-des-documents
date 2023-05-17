import React from 'react'
import SideNav from '../../components/sidenav'
import UserForm from '../../components/recteur/users/utilisateurform'
import { faCertificate, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";

type Props = {
    children: JSX.Element
}

const options = [{ name: "Gerer Utilisateurs", link: "/superadmin/gerer_users", icon: faUser },
{ name: "Creer Utilisateur", link: "/superadmin/create_users", icon: faUserPlus },
{ name: "Verifier Diplomes", link: "/superadmin/verifier_diplome", icon: faCertificate }]

export default function SuperAdminLayout ({ children }: Props) {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <SideNav name="Mohamed" image_link="/Rafik.jpg" options={options} toggled={(open) => { setOpen(open) }} />
            <div className='flex max-w-screen '>
                <div className={`${open ? 'md:ml-[350px]' : 'ml-[56px]'} w-full overflow-x-auto transition-all duration-300`}>
                    {children}
                </div>
            </div>
        </>

    )
}
