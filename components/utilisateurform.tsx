import { faCalendar, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faPhone,faLocationDot } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Dropdown from './dropdown'
import CircularImageInput from './imageinput'
import Input from './input'
import emailjs from 'emailjs-com';
import { api } from '../src/utils/api'

export default function UserForm() {
  const mutation = api.users.AddUser.useMutation();
    const [user,setUser] = React.useState<any>({
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
    function Submit(){
      user.matricule = parseInt(user.matricule);
      user.telephone = parseInt(user.telephone);
      user.image = {name: user.image.name, size: user.image.size, lastModified: user.image.lastModified, type: user.image.type};
      //api call to call user
       mutation.mutate(user); 
      //send email to user to configute his password
       
    }
  return (
    <div className="p-8 flex flex-col justify-center items-center h-screen overflow-y-scroll scrollbar scrollbar-thumb-slate-600 scroll-smooth">
          <h1 className="text-3xl pt-4 font-bold text-link-text-blue">Ajouter Utilisateur</h1>
          <CircularImageInput onChange={(file:any) => setUser((prevState:any) => ({...prevState,image: file,}))} />
          <Input type="text" placeholder="Nom" onChange={(val:any) => setUser((prevState:any) => ({...prevState,nom: val,}))} icon={faUser}/>
          <Input type="text" placeholder="Prenom" onChange={(val:any) => setUser((prevState:any) => ({...prevState,prenom: val,}))} icon={faUser}/>
          <Input type="number" placeholder="Matricule" onChange={(val:any) => setUser((prevState:any) => ({...prevState,matricule: val,}))} icon={faUser}/>
          <Input type="text" placeholder="Date de Naissance" onChange={(val:any) => setUser((prevState:any) => ({...prevState,date_naissance: val,}))} icon={faCalendar}/>
          <Input type="text" placeholder="leui de Naissance" onChange={(val:any) => setUser((prevState:any) => ({...prevState,leui_naissance: val,}))} icon={faLocationDot}/>
          <Input type="email" placeholder="Email" onChange={(val:any) => setUser((prevState:any) => ({...prevState,email: val,}))} icon={faEnvelope}/>
          <Input type="number" placeholder="Telephone" onChange={(val:any) => setUser((prevState:any) => ({...prevState,telephone: val,}))} icon={faPhone}/>
          <Dropdown onChange={(val:any) => setUser((prevState:any) => ({...prevState,role: val,}))} options={["Type de Utilisateur","Doyen","Chef Departement"]}/>
          <button  onClick={Submit} className=" text-lg font-medium py-4 w-96 text-white m-4 shadow-md hover:shadow-xl bg-link-text-blue rounded-xl">Ajouter</button>
    </div>
  )
}
