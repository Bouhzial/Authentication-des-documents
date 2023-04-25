import React from 'react'
import { CursusUniversitaire, Etudiant, Diplome } from '@prisma/client';
import Modifinginput from './modifinginput';



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
      <div className=' flex flex-col items-start py-32 px-16 text-xl font-semibold gap-2 bg-gray-100 h-3/4 w-3/4 rounded-2xl'>
        <h1 className='text-2xl'>Diplome de l'etudian {diplome.student.nom} {diplome.student.prenom}</h1>
        <Modifinginput  text='Nom: ' value={diplome.student.nom} />
        <Modifinginput  text='Prenom: ' value={diplome.student.prenom} />
        <Modifinginput  text='Type de diplome: ' value={diplome.type} />
        <Modifinginput  text='Email: ' value={diplome.student.email} />
        <Modifinginput  text='Matricule: ' value={diplome.student.matricule} />
        <Modifinginput  text='Date de naissance: ' value={diplome.student.date_naissance} />
        <Modifinginput  text='Moyenne_annuelle: ' value={diplome.student.CursusUniversitaire[0]?.moyenne_annuelle!.toString()} />
        <Modifinginput  text='Signed par le doyen: ' value={diplome.signedByDoyen.toString()} />
        <Modifinginput  text='Signed par le recteur: ' value={diplome.signedByRector.toString()} />
      </div>
    </div>
  )
}
