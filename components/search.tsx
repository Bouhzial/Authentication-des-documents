import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Search() {
    const [clicked,setClicked] = React.useState(false);
  return (
    <div className="flex items-center ml-2 gap-2">
        <FontAwesomeIcon icon={faSearch} className="h-4 relative text-gray-400 left-10 cursor-pointer"/>
        <input type="text" placeholder="Rechercher Utilisateur" className="focus:border-2 focus:border-gray-900 transition-all w-72 h-12 pl-12 pr-4 border rounded-lg border-link-gray text-gray-400 focus:text-black font-medium  outline-none  "/>
        <select onClick={()=>setClicked(!clicked)} className='focus:border-2 focus:border-gray-900 transition-all w-32 h-12 px-4 border rounded-lg border-link-gray text-gray-400 focus:text-black font-medium  outline-none' >
          <option value="1">Nom</option>
          <option value="2">Role</option>
          <option value="3">Email</option>
        </select>
        <FontAwesomeIcon icon={faChevronDown}  style={{ pointerEvents: 'none' }} className={`relative  h-4 right-8 ${clicked?'rotate-180 text-black transition-all':"rotate-0 text-gray-400 transition-all"}`}/>
        </div>
  )
}
