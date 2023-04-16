import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
    options: string[];
    onChange: (val: string) => void;
}
export default function EditRole({options,onChange}:Props) {
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
    <div className='text-black w-96 h-16 mx-4 flex flex-col items-center hover:cursor-pointer' onClick={()=>{setClicked(!clicked)}}>
        <label className=' text-link-text-gray text-center text-lg font-medium'>role</label>
        <select onChange={handelChange} className='cursor-pointer text-center w-96 h-16 outline-none text-lg font-medium py-3 px-5 rounded-xl shadow-lg pointer-events-auto focus:shadow-xl transition-all '>
            {options.map((option,index) => (
                <option className='bg-blue' value={option}>{option}</option>
            ))}
        </select>
        <FontAwesomeIcon icon={faChevronDown}  style={{ pointerEvents: 'none' }} className={`relative h-6 bottom-2/3 left-40 ${clicked?'rotate-180 transition-all':"rotate-0 transition-all"}`}/>
    </div>
  )
}