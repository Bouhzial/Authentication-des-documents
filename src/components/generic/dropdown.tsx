import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
    options: string[];
    onChange: (val: string) => void;
}
export default function Dropdown({options,onChange}:Props) {
    const [clicked,setClicked] = React.useState(false);
    const [value,setValue] = React.useState<string>('')
   function handelChange(e:any){
       const val = e.target.value
       if(val){
           setValue(val)
           onChange(val)
       }
   }
  return (
    <div className='col-span-2 text-black w-96 h-16 mx-4 hover:cursor-pointer' onClick={()=>{setClicked(!clicked)}}>
        <select onChange={handelChange} className='cursor-pointer w-96 h-16 outline-none text-lg font-medium py-3 px-5 rounded-xl shadow-lg pointer-events-auto focus:shadow-xl transition-all '>
            {options.map((option,index) => (
                index === 0 ? <option disabled selected>{option}</option> :
                <option className='bg-blue' value={option}>{option}</option>
            ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown}  style={{ pointerEvents: 'none' }} className={`relative h-6 bottom-2/3 left-80 ${clicked?'rotate-180 transition-all':"rotate-0 transition-all"}`}/>
    </div>
  )
}