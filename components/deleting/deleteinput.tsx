import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { devNull } from 'os';
import React from 'react'


interface Props {
    type: string;
    placeholder: string;
    icon: any;
    val: string;
}
export default function DeleteInput({type,placeholder,val,icon}:Props) {  
  return (
    <div className='w-96 h-16 flex flex-col items-center text-black text-lg font-medium m-4'>
        <label className=' text-link-text-gray text-center text-lg font-medium'>{placeholder}</label>
        <input type={type} value={val} className='text-center w-96 outline-none text-lg font-medium h-16 py-3 px-5 rounded-xl shadow-lg pointer-events-auto  focus:shadow-xl transition-all '/>
        <FontAwesomeIcon icon={icon} className='cursor-pointer relative h-6 bottom-2/3 left-80'/>
    </div>
  )
}