import React, { useEffect } from 'react'
import Search from '../../generic/search';
import { SearchedObejct } from '../../../types/types';
import { api } from '../../../utils/api';
import { useSession } from 'next-auth/react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CursusUniversitaire, Etudiant } from '@prisma/client';
import StudentModal from './studentModual';

export default function GereStudents () {
  const { data: session } = useSession()
  const students = api.issuer.students.GetStudents.useQuery().data!;

  const [serach, setSearch] = React.useState<SearchedObejct>({
    serached: '',
    type: 'nom',
  })

  const [selectedstudent, setStudent] = React.useState<Etudiant & {
    CursusUniversitaire: CursusUniversitaire[];
  }>()
  const [view, setView] = React.useState(false)
  const show = (student: Etudiant & {
    CursusUniversitaire: CursusUniversitaire[];
  }) => {
    setStudent(student)
    setView(true)
    console.log(selectedstudent, view);

  }
  const [searchedData, setSearchedData] = React.useState<(Etudiant & {
    CursusUniversitaire: CursusUniversitaire[]
  })[]>()

  useEffect(() => {
    setSearchedData(students)
  }, [students])


  const searchData = () => {
    if (serach.serached.length > 0) {
      const newData = students.filter((student: Etudiant & {
        CursusUniversitaire: CursusUniversitaire[];
      }) => {
        if (serach.type === 'nom') {
          return student.nom.toLowerCase().includes(serach.serached.toLowerCase())
        } else if (serach.type === 'matricule') {
          return student.matricule.toLowerCase().includes(serach.serached.toLowerCase())
        } else if (serach.type === 'annee') {
          return student.CursusUniversitaire[0]?.niveau.toString().toLowerCase().includes(serach.serached.toLowerCase())
        } else if (serach.type === 'filiere') {
          return student.CursusUniversitaire[0]?.filiere!.toLowerCase().includes(serach.serached.toLowerCase())
        } else if (serach.type === 'specialite') {
          return student.CursusUniversitaire[0]?.specialite!.toString().toLowerCase().includes(serach.serached.toLowerCase())
        } else if (serach.type === 'section') {
          return student.CursusUniversitaire[0]?.section.toLowerCase().includes(serach.serached.toLowerCase())
        } else if (serach.type === 'groupe') {
          return student.CursusUniversitaire[0]?.groupe.toLowerCase().includes(serach.serached.toLowerCase())
        }
      })
      setSearchedData(newData)
    }
    else {
      setSearchedData(students)
    }
  }
  return (
    <div className='p-8 flex h-screen flex-col items-center'>
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Gerer les etudiants</h1>
          <p className='text-sm text-gray-500'>Vous pouverz ici gerer les etudiants de votre departement</p>
        </div>
        <Search fileds={["nom", "matricule", "annee", "filiere", "specialite", "section", "groupe"]} change={(val: SearchedObejct) => { setSearch(val); searchData() }} />
      </div>
      <div className='w-full'>
        <table className="w-full mt-8">
          <thead>
            <tr className="h-16 border-b border-gray-400 font-lg text-gray-400">
              <th className="text-left pl-4 ">Nom</th>
              <th className="text-left pl-4 ">Matricule</th>
              <th className="text-left pl-4 ">annee</th>
              <th className="text-left pl-4 ">Speciality</th>
              <th className="text-left pl-4 ">Section</th>
              <th className="text-left pl-4 ">Groupe</th>
              <th className="text-left pl-4 ">Filiere</th>
            </tr>
          </thead>
          <tbody>
            {searchedData && searchedData?.map((student: Etudiant & {
              CursusUniversitaire: CursusUniversitaire[];
            }) => (
              <tr className="h-16 border-b border-gray-200">
                <td className="pl-4">{student.nom} {student.prenom}</td>
                <td className="pl-4">{student.matricule}</td>
                <td className="pl-4">{student.CursusUniversitaire[0]?.niveau}</td>
                <td className="pl-4">{student.CursusUniversitaire[0]?.specialite}</td>
                <td className="pl-4">{student.CursusUniversitaire[0]?.section}</td>
                <td className="pl-4">{student.CursusUniversitaire[0]?.groupe}</td>
                <td className="pl-4">{student.CursusUniversitaire[0]?.filiere}</td>
                <td className="pl-4">
                  <FontAwesomeIcon onClick={() => { show(student) }} icon={faEye} className='text-link-text-blue hover:cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(view && selectedstudent) && <StudentModal student={selectedstudent} close={() => { setView(false) }} />}
    </div>

  )
}
