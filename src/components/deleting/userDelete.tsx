import React from 'react'
import { api } from '../../utils/api';
import { User } from '../../types/types';
import DeleteInput from './deleteinput';


interface Props {
  user: User;
  checkvisible: (val: boolean) => void
}
export default function UserDelete ({ user, checkvisible }: Props) {
  const mutation = api.users.deleteUserById.useMutation();
  const [modifiedUser, setModifiedUser] = React.useState<User>(user)
  modifiedUser.id = user.id
  function Delete (user: User) {
    mutation.mutate(user.id);
    checkvisible(false)
  }
  function change () {
    checkvisible(false)
  }
  function getRole(id:number){
    if(id==1){
      return "recteur"
    }
    else if(id==2){
      return "chef departement"
    }
    else if(id==3){
      return "doyen"
    }
    else if(id==4){
      return "etudiant"
    }
    return "inconnu"
  }
  return (
    <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50'>
      <div className='top-0 absolute left-0 h-[12.5%] w-screen bg-transparent' onClick={change}></div>
      <div className='absolute top-0 left-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute bottom-0 right-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute h-[12.5%] bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
      <div className=' place-items-center grid grid-cols-2  bg-gray-100 h-3/4 w-3/4 rounded-2xl'>
        <h1 className='col-span-2 text-link-text-blue font-bold text-2xl'>Supprimer {user.nom} </h1>
        <DeleteInput type='text' placeholder='nom' val={user.prenom} />
        <DeleteInput type='text' placeholder='prenom' val={user.nom} />
        <DeleteInput type='text' placeholder='role' val={getRole(user.role_id)} />
        <DeleteInput type='text' placeholder='email' val={user.email} />
        <DeleteInput type='text' placeholder='matricule' val={user.matricule.toString()} />
        <DeleteInput type='text' placeholder='date de naissance' val={user.date_naissance} />
        <DeleteInput type='text' placeholder='leui de naissance' val={user.leui_naissance} />
        <DeleteInput type='text' placeholder='telephone' val={user.telephone.toString()} />
        <button onClick={() => Delete(modifiedUser)} className='rounded-xl font-semibold w-72 h-16 text-white bg-red-600'>Supprimer</button>
        <button onClick={change} className='rounded-xl  font-semibold w-72 h-16 text-white bg-blue-800'>Annuler</button>
      </div>
    </div>
  )
}
