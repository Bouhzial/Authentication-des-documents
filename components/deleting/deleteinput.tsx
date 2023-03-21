import React from 'react'


interface Props {
    type: string;
    placeholder: string;
    val: string;
}
export default function DeleteInput({type,placeholder,val}:Props) {  
  return (
    <div className='w-2/3 h-16 flex flex-col items-center text-black text-lg font-medium m-4'>
        <label className=' text-link-text-gray text-center text-lg font-medium'>{placeholder}</label>
        <input readOnly type={type} value={val} className='text-center w-full outline-none text-lg font-medium h-16 py-3 px-5 rounded-xl shadow-lg pointer-events-auto  focus:shadow-xl transition-all '/>
    </div>
  )
}