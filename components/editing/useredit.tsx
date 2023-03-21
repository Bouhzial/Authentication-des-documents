import { faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { api } from '../../src/utils/api';
import { User } from '../../types';
import EditInput from './EditInput';
import EditRole from './editrole';

  
interface Props {
    user: User;
    checkvisible: (val:boolean) => void
}
export default function Useredit({user,checkvisible}:Props) {
  const mutation = api.users.modifyUser.useMutation()
  const [modifiedUser,setModifiedUser] = React.useState<User>(user)
  modifiedUser.id=user.id
  function modifier(user:User){
      console.log(user)
      mutation.mutate(user)
      checkvisible(false)
  }
  function change(){
    checkvisible(false)
  }
  return (
    <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50'>
      <div className='top-0 absolute left-0 h-[12.5%] w-screen bg-transparent' onClick={change}></div>
      <div className='absolute top-0 left-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute bottom-0 right-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute h-[12.5%] bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
      <div  className=' place-items-center grid grid-cols-2  bg-gray-100 h-3/4 w-3/4 rounded-2xl'>
            <h1 className='col-span-2 text-link-text-blue font-bold text-2xl'>Modifier {user.nom} </h1>
            <EditInput type='text' placeholder='nom' val={user.nom}  onChange={(val) => modifiedUser.nom=val} />
            <EditInput type='text' placeholder='prenom' val={user.prenom}  onChange={(val) => modifiedUser.prenom=val} />
            <EditRole  onChange={(val) => modifiedUser.role=val} options={["Doyen","Chef Departement"]} />
            <EditInput type='text' placeholder='email' val={user.email}  onChange={(val) => modifiedUser.email=val} />
            <EditInput type='number' placeholder='matricule' val={user.matricule.toString()}  onChange={(val) => modifiedUser.matricule=parseInt(val)} />
            <EditInput type='text' placeholder='date de naissance' val={user.date_naissance}  onChange={(val) => modifiedUser.date_naissance=val} />
            <EditInput type='text' placeholder='leui de naissance' val={user.leui_naissance}  onChange={(val) => modifiedUser.leui_naissance=val} />
            <EditInput type='number' placeholder='telephone' val={user.telephone.toString()}  onChange={(val) => modifiedUser.telephone=parseInt(val)} />
            <button onClick={()=>modifier(modifiedUser)} className='rounded-xl font-semibold w-72 h-16 text-white bg-blue-800'>Modifie</button>
            <button onClick={change} className='rounded-xl  font-semibold w-72 h-16 text-white bg-red-600'>Annuler</button>
        </div>
    </div>
  )
}
