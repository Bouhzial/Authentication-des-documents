import React from 'react'
import DeleteInput from '../users/deleting/deleteinput';
import { CursusUniversitaire, Etudiant, Diplome } from '@prisma/client';


interface Props {
  diplome: Diplome & {
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  },
  close: (val: boolean) => void;
}

export default function ViewDiplome ({ diplome, close }: Props) {
  function change () {
    close(false)
  }

  return (
    <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50'>
      <div className='top-0 absolute left-0 h-[12.5%] w-screen bg-transparent' onClick={change}></div>
      <div className='absolute top-0 left-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute bottom-0 right-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute h-[12.5%] bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
      <div className=' place-items-center grid grid-cols-2  bg-gray-100 h-3/4 w-3/4 rounded-2xl'>
        <DeleteInput type='text' placeholder='nom' val={diplome.student.nom} />
        <DeleteInput type='text' placeholder='prenom' val={diplome.student.prenom} />
        <DeleteInput type='text' placeholder='type de diplome' val={diplome.type} />
        <DeleteInput type='text' placeholder='email' val={diplome.student.email} />
        <DeleteInput type='text' placeholder='matricule' val={diplome.student.matricule} />
        <DeleteInput type='text' placeholder='date de naissance' val={diplome.student.date_naissance} />
        <DeleteInput type='text' placeholder='signed par le doyen' val={diplome.signedByDoyen.toString()} />
      </div>
    </div>
  )
}
