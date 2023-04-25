import React from 'react'
import { CursusUniversitaire, Etudiant } from '@prisma/client';
import { api } from '../../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Modifinginput from '../../generic/modifinginput';

interface Props {
  
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  ,
  close: (val: boolean) => void;
}

export default function StudentModal ({ student, close }: Props) {
    

  function change () {
    close(false)
  }
  console.log(student);
  
  return (
    <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50'>
      <div className='top-0 absolute left-0 h-[12.5%] w-screen bg-transparent' onClick={change}></div>
      <div className='absolute top-0 left-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute bottom-0 right-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute h-[12.5%] bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
      <div className=' flex flex-col items-start py-28 px-16 text-xl font-semibold gap-2 bg-gray-100 h-3/4 w-3/4 rounded-2xl'>
        <h1 className='text-2xl'>Etudiant {student.nom} {student.prenom}</h1>
        <Modifinginput text='Nom: ' placeholder={student.nom} />
        <Modifinginput text='Prenom: ' placeholder={student.prenom} />
        <Modifinginput text='Matricule: ' placeholder={student.matricule} />
        <Modifinginput text='Email: ' placeholder={student.email} />
        <Modifinginput text='Telephone: ' placeholder={student.telephone} />
        <Modifinginput text='Filiere: ' placeholder={student.CursusUniversitaire[0]?.filiere!} />
        <Modifinginput text='Specialite: ' placeholder={student.CursusUniversitaire[0]?.specialite!} />
        <Modifinginput text='Section: ' placeholder={student.CursusUniversitaire[0]?.section!} />
        <Modifinginput text='Niveau: ' placeholder={student.CursusUniversitaire[0]?.niveau!.toString()!} />
        <Modifinginput text='Groupe: ' placeholder={student.CursusUniversitaire[0]?.groupe!} />
      </div>
    </div>
  )
}
