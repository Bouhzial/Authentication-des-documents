import React from 'react'
import { CursusUniversitaire, Etudiant, Diplome, Departement } from '@prisma/client';
import Diploma from '../generic/diploma';




interface Props {
  diplome: Diplome & {
    student: Etudiant & {
      CursusUniversitaire: CursusUniversitaire[];
    }
  },
  close: (val: boolean) => void;
  departements : Departement[];
}

export default function DiplomaTemplate ({ diplome, close, departements }: Props) {
    const depaetment = departements.find((dep) => dep.id === diplome.student.CursusUniversitaire[0]?.departement_id)
  function change () {
    close(false)
  }

  return (
    <div className='flex absolute top-0 left-0 justify-center items-center h-screen w-screen bg-slate-600 bg-opacity-50'>
      <div className='top-0 absolute left-0 h-[12.5%] w-screen bg-transparent' onClick={change}></div>
      <div className='absolute top-0 left-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute bottom-0 right-0 h-screen w-[12.5%] bg-transparent' onClick={change}></div>
      <div className='absolute h-[12.5%] bottom-0 right-0 w-screen bg-transparent' onClick={change}></div>
      <Diploma diplome={diplome} departement={depaetment?.nom}/>
    </div>
  )
}