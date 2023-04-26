import { CursusUniversitaire, Diplome, Etudiant } from '@prisma/client';
import React from 'react'
import { ZodDate } from 'zod';

interface Props {
    diplome: Diplome & {
      student: Etudiant & {
        CursusUniversitaire: CursusUniversitaire[];
      }
    },
    departement: string | undefined;
}

export default function Diploma({ diplome,departement }: Props) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = day + "/" + month + "/" + year;
  return (
    <div className=' flex flex-col items-center p-10 text-xl gap-2 bg-gray-100 h-3/4 w-3/4 bg-[url("/bg.png")] bg-no-repeat bg-fill bg-center'>
        
        <div className='flex gap-4 mr-16'>
            <div className=''>
            <img src="/logo.jpg" alt="logo" className='h-24 w-32 object-fill'/>
            </div>
           <div className='flex flex-col items-center gap-2 '> 
           <p className='text-sm font-serif font-semibold'>Republic Algerienne Democratique et Populaire</p>
           <p className='text-sm font-serif font-semibold'>Mibustere de L'Enseignement Superieur et de la Recherche Scientifique</p>
           <p className='text-sm font-serif font-semibold'>University des Science et de la Technologie - HOUARI BOUMEDIENE</p>
           <h1 className='text-2xl font-extrabold font-serif '>ATTESTAION PROVISOIRE DE SUCCES</h1>
           </div>
        </div>
        <div className='flex flex-col gap-2 w-full font-medium mt-6'>
            <p className='text-sm font-serif'>Le Recteur de l"universite Des Sciences det de la Technologie - HOURAI BOMEDIENE </p>
            <p className='text-sm font-serif ml-2'>- Vu le derect executif N<sup>o</sup> 08-265 du 18 aout 2008 portant creation du diplome de licence de licence et de master et de doctorat, <br />
            - Vu l'arrete N<sup>o</sup> du 24/09/2013 portant habilitation de l'universite a dispenser de la formation {diplome.type} <br />
            - Vu la proces verbal de deliberation en date {diplome.date_obtention.toDateString()}</p>
      </div>
      <div className='flex  gap-2 w-full font-medium mt-3'>
            <p className='text-sm font-serif font-semibold'>Atteste, que l'etudinat(e): {diplome.student.nom.toUpperCase()+" "+diplome.student.prenom.toUpperCase()} </p>
            <p className='text-sm font-serif font-semibold ml-20'>Ne(e) le: {diplome.student.date_naissance.toUpperCase()} a {diplome.student.lieu_naissance.toUpperCase()}</p>
      </div>
        <div className='flex flex-col gap-2 w-full font-medium mt-3'>
            <p className='text-sm font-serif font-semibold'>A obtunu le diplome de : {diplome.type.toUpperCase()} </p>
        </div>
        
        <div className='flex flex-col gap-2 w-full font-medium mt-3'>
            <p className='text-sm font-serif font-semibold'>Filier: {diplome.student.CursusUniversitaire[0]?.filiere?.toUpperCase()}</p>
        </div>
        <div className='flex flex-col gap-2 w-full font-medium mt-3'>
            <p className='text-sm font-serif font-semibold'>Specialite : {diplome.student.CursusUniversitaire[0]?.specialite?.toUpperCase()} </p>
        </div>
        <div className='flex flex-col gap-2 w-full font-medium mt-3'>
            <p className='text-sm font-serif font-semibold'>Departement : {departement?.toUpperCase()} </p>
        </div>
        <div className='flex  w-full mt-3 ml-8'>
            <p className='text-sm font-serif font-semibold'>Le Doyen de la faculte</p>
            <p className='text-sm font-serif font-semibold ml-40'>Le Recteur de l'universite</p>
            <p className='text-xs font-serif ml-80'>Alger le {currentDate}</p>
        </div>
        <p className=' text-xs font-serif relative top-[4.8rem]'>NB: il n'est delivre qu'un seul exmeplaire de la presente attension </p>

      </div>
  ) 
}
