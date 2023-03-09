import React from 'react'
import { api } from '../../src/utils/api';
import DeleteInput from './deleteinput';

interface User {
    id: string;
    nom: string;
    role: string;
    email: string;
    matricule: number;
    prenom: string;
    date_naissance: string;
    leui_naissance: string;
    telephone: number;
    image: {
      name: string;
      size: number;
      lastModified: number;
      type: string;
    };
    //add the other user fields
  }
    interface Props {
        user: User;
        checkvisible: (val:boolean) => void
    }
export default function UserDelete({user,checkvisible}:Props) {
  const mutation = api.users.deleteUserById.useMutation();
  const [modifiedUser,setModifiedUser] = React.useState<User>(user)
  modifiedUser.id=user.id
  function Delete(user:User){
    console.log(user.id);
    
      mutation.mutate(user.id); 
      checkvisible(false)
  }
  function change(){
    checkvisible(false)
  }
  return (
    <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50'>
      <div className='top-0 absolute left-0 h-1/6 w-screen bg-transparent' onClick={change}></div>
      <div className='absolute top-0 left-0 h-screen w-1/6 bg-transparent' onClick={change}></div>
      <div className='absolute bottom-0 right-0 h-screen w-1/6 bg-transparent' onClick={change}></div>
      <div className='absolute h-1/6 bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
      <div  className=' place-items-center grid grid-cols-2  bg-gray-100 h-2/3 w-2/3 rounded-2xl'>
            <h1 className='col-span-2 text-link-text-blue font-bold text-2xl'>Supprimer {user.nom} </h1>
            <DeleteInput type='text' placeholder='nom' val={user.prenom} icon='user' />
            <DeleteInput type='text' placeholder='prenom' val={user.nom} icon='user' />
            <DeleteInput type='text' placeholder='role' val={user.role} icon='user' />
            <DeleteInput type='text' placeholder='email' val={user.email} icon='user '/>
            <DeleteInput type='text' placeholder='matricule' val={user.matricule.toString()} icon='user' />
            <DeleteInput type='text' placeholder='date de naissance' val={user.date_naissance} icon='user' />
            <DeleteInput type='text' placeholder='leui de naissance' val={user.leui_naissance} icon='user' />
            <DeleteInput type='text' placeholder='telephone' val={user.telephone.toString()} icon='user'  />
            <button onClick={()=>Delete(modifiedUser)}  className='rounded-xl font-semibold w-72 h-16 text-white bg-red-600'>Supprimer</button>
            <button onClick={change} className='rounded-xl  font-semibold w-72 h-16 text-white bg-blue-800'>Annuler</button>
        </div>
    </div>
  )
}
