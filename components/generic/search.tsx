import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface SearchedObejct {
  serached: string;
  type: string;
}
interface Props {
  change: (val: SearchedObejct) => void;
}
export default function Search({change}:Props) {
    const [clicked,setClicked] = React.useState(false);
    const [Searched,setsearched]= React.useState<SearchedObejct>({
      serached:'',
      type:'nom',
    })
    function handelChange(type:number, e:React.ChangeEvent<HTMLInputElement>){
      if(type==1){
        Searched.serached = e.target.value;
      }
      else{
       Searched.type = e.target.value;
      }
      change(Searched)
    }
    
  return (
    <div className="flex items-center ml-2 gap-2">
        <FontAwesomeIcon icon={faSearch} className="h-4 relative text-gray-400 left-10 cursor-pointer"/>
        <input onChange={(e:any)=>handelChange(1,e)} type="text" placeholder="Rechercher Utilisateur" className="focus:border-2 focus:border-gray-900 transition-all w-72 h-12 pl-12 pr-4 border rounded-lg border-link-gray text-gray-400 focus:text-black font-medium  outline-none  "/>
        <select onChange={(e:any)=>handelChange(2,e)} onClick={()=>setClicked(!clicked)} className='focus:border-2 focus:border-gray-900 transition-all w-32 h-12 px-4 border rounded-lg border-link-gray text-gray-400 focus:text-black font-medium  outline-none' >
          <option value="nom">Nom</option>
          <option value="role">Role</option>
          <option value="email">Email</option>
          <option value="matricule">matricule</option>
        </select>
        <FontAwesomeIcon icon={faChevronDown}  style={{ pointerEvents: 'none' }} className={`relative  h-4 right-8 ${clicked?'rotate-180 text-black transition-all':"rotate-0 text-gray-400 transition-all"}`}/>
        </div>
  )
}
