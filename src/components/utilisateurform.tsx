import { faCalendar, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Dropdown from './generic/dropdown'
import CircularImageInput from './generic/imageinput'
import Input from './generic/input'
import { uuid } from 'uuidv4';
import { api } from '../utils/api'


export default function UserForm () {
  const mutation = api.users.AddUser.useMutation();
  const [user, setUser] = React.useState<any>({
    id: 0,
    nom: '',
    prenom: '',
    date_naissance: '',
    leui_naissance: '',
    email: '',
    telephone: 0,
    role: '',
    matricule: 0,
    image: null,
  })
  function Submit () {
    user.id = uuid();
    console.log(user.id)
    user.matricule = parseInt(user.matricule);
    user.telephone = parseInt(user.telephone);
    user.image = { name: user.image.name, size: user.image.size, lastModified: user.image.lastModified, type: user.image.type };
    //api call to call user
    mutation.mutate(user);
    //send email to user to configute his password

  }
  return (
    <div className="w-4/5 p-8 place-items-center grid grid-cols-4 justify-center items-center h-screen overflow-y-scroll scrollbar scrollbar-thumb-slate-600 scroll-smooth">
      <h1 className="text-3xl text-center col-span-4 pt-4 mt-10 font-bold text-link-text-blue">Ajouter Utilisateur</h1>
      <CircularImageInput onChange={(file: any) => user.image = file} />
      <Input type="text" placeholder="Nom" onChange={(val: string) => user.nom = val} icon={faUser} />
      <Input type="text" placeholder="Prenom" onChange={(val: string) => user.prenom = val} icon={faUser} />
      <Input type="number" placeholder="Matricule" onChange={(val: string) => user.matricule = val} icon={faUser} />
      <Input type="text" placeholder="Date de Naissance" onChange={(val: string) => user.date_naissance = val} icon={faCalendar} />
      <Input type="text" placeholder="leui de Naissance" onChange={(val: string) => user.leui_naissance = val} icon={faLocationDot} />
      <Input type="email" placeholder="Email" onChange={(val: string) => user.email = val} icon={faEnvelope} />
      <Input type="number" placeholder="Telephone" onChange={(val: string) => user.telephone = val} icon={faPhone} />
      <Dropdown onChange={(val: string) => user.role = val} options={["Type de Utilisateur", "Doyen", "Chef Departement"]} />
      <button onClick={Submit} className="col-start-2 col-span-2 items-center text-lg font-medium py-4 w-96 text-white m-4 shadow-md hover:shadow-xl bg-link-text-blue rounded-xl">Ajouter</button>
    </div>
  )
}
