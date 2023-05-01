import { faCalendar, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useRef, useState } from 'react'
import Dropdown from '../../generic/dropdown'
import { CircularImageInput, RefMethods } from '../../generic/imageinput'
import Input from '../../generic/input'
import { api } from '../../../utils/api'
import { User } from '../../../types/types'
import toast from 'react-hot-toast';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { useSession } from 'next-auth/react'
import { env } from 'process'



const emptyDefaultUser: User = {
    nom: '',
    prenom: '',
    date_naissance: '',
    leui_naissance: '',
    email: '',
    telephone: '',
    role_id: 0,
    matricule: '',
    image: {
        name: "",
        size: 0,
        lastModified: "",
        type: "",
    },
    departement_id: 0,
    faculty_id: 0,
}

export default function UserForm () {
    const { data: session } = useSession();
    const userRoles = ["Doyen", "Chef Departement"]
    const faculties = api.etablisments.GetFacultiesByEtablissement.useQuery().data;
    const departements = api.etablisments.GetDepartementsByEtablissement.useQuery().data;
    // const [facultiesObject, setFacultiesObject] = useState(); // facultes object
    // const [departementsObject, setDepartementsObject] = useState<[]>([]); // departements object
    const createUserMutation = api.recteur.users.CreateUser.useMutation();
    const [user, setUser] = useState<User>(emptyDefaultUser)
    const [file, setFile] = useState<File>();
    const imageInput = useRef<RefMethods>(null);

    async function handleSubmit () {

        let image;



        if (file) {
            image = {
                name: file?.name,
                size: file?.size,
                lastModified: `${file?.lastModified}`,
                type: file?.type,
            }
        }
        try {
            const { id: userId } = await createUserMutation.mutateAsync({
                ...user,
                role_id: user.role_id + 1,
                telephone: `${user.telephone}`,
                image
            });
            await uploadImage(userId)
            toast.success("User Created Success2/3y")
            //reset the form
            setUser(emptyDefaultUser)
            setFile(undefined)
            imageInput?.current?.resetPreview()


        } catch (err) {
            toast.error(createUserMutation.error?.message || "Erreur s'est produite");
            console.log("catch error"); // output: catch error
        }

    }

    const uploadImage = async (userId: number) => {
        if (!file) return
        let formdata = new FormData();

        formdata.append("files", file);
        formdata.append("id", `${userId}`);

        console.log(formdata)
        const ress = await fetch(`/api/upload/profile-pic`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formdata
        });
    }

    return (
        <div className="w-4/5 p-8 place-items-center grid grid-cols-4 justify-center items-center h-screen overflow-y-scroll scrollbar scrollbar-thumb-slate-600 scroll-smooth">
            <h1 className="text-3xl text-center col-span-4 pt-4 mt-10 font-bold text-link-text-blue">Ajouter Utilisateur</h1>
            <CircularImageInput ref={imageInput} onChange={(file) => setFile(file)} />
            <Input className='w-2/3' type="text" placeholder="Nom" onChange={(e) => setUser({ ...user, nom: e.target.value })} value={user.nom} icon={faUser} />
            <Input className='w-2/3' type="text" placeholder="Prenom" onChange={(e) => setUser({ ...user, prenom: e.target.value })} value={user.prenom} icon={faUser} />
            <Input className='w-2/3' type="number" placeholder="Matricule" onChange={(e) => setUser({ ...user, matricule: e.target.value })} value={user.matricule} icon={faUser} />
            <Input className='w-2/3' type="text" placeholder="Date de Naissance" onChange={(e) => setUser({ ...user, date_naissance: e.target.value })} value={user.date_naissance} icon={faCalendar} />
            <Input className='w-2/3' type="text" placeholder="leui de Naissance" onChange={(e) => setUser({ ...user, leui_naissance: e.target.value })} value={user.leui_naissance} icon={faLocationDot} />
            <Input className='w-2/3' type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} icon={faEnvelope} />
            <Input className='w-2/3' type="number" placeholder="Telephone" onChange={(e) => setUser({ ...user, telephone: e.target.value })} value={user.telephone} icon={faPhone} />
            <Dropdown onChange={(e) => setUser({ ...user, role_id: Number(e.target.value) })} value={user.role_id} options={["Type de Utilisateur", ...userRoles]} />
            {faculties ?
                <Dropdown
                    onChange={(e) => setUser({ ...user, faculty_id: Number(e.target.value) })}
                    value={user.faculty_id}
                    options={["Faculté", ...(faculties?.map(({ nom }) => nom))]}
                    optionsValues={faculties?.map(({ id }) => id)}
                />
                : null}
            {departements ?
                <Dropdown onChange={(e) => setUser({ ...user, departement_id: Number(e.target.value) })}
                    value={user.departement_id}
                    options={["Departement", ...(departements.map(({ nom }) => nom))]}
                    optionsValues={departements?.map(({ id }) => id)}
                />
                : null}
            <button disabled={createUserMutation.isLoading} onClick={handleSubmit} className="col-start-2 col-span-2 items-center text-lg font-medium py-4 w-96 text-white m-4 shadow-md hover:shadow-xl bg-link-text-blue rounded-xl">Ajouter</button>
        </div>
    )
}