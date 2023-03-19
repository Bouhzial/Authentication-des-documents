import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { api } from '../utils/api';
import Search from './search'

interface Props {
  data: any;
}
export default function UserDashBoard ({ data }: Props) {

  console.log(data);
  return (
    <div className='m-8 flex flex-col items-center w-full'>
      <div className='flex items-center justify-between w-full'>
        <h1 className="mr-2 text-3xl font-bold text-link-text-blue">Les Utilisateurs </h1>
        <Search />
      </div>
      <div className='w-full'>
        <table className="w-full mt-8">
          <thead>
            <tr className="h-16 border-b border-gray-200">
              <th className="text-left pl-4 font-medium text-gray-400">Nom</th>
              <th className="text-left pl-4 font-medium text-gray-400">Role</th>
              <th className="text-left pl-4 font-medium text-gray-400">Email</th>
              <th className="text-left pl-4 font-medium text-gray-400">Matricule</th>
              <th />
            </tr>
          </thead>
          <tbody className='text-black'>

            {data && data.map((user: any) => {
              return (
                <tr className="h-16">
                  <td className="pl-4 ">{user.nom + " " + user.prenom}</td>
                  <td className="pl-4 ">{user.role}</td>
                  <td className="pl-4 ">{user.email}</td>
                  <td className="pl-4">{user.matricule}</td>
                  <td className="pl-4">DELETE </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

