import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
    text : string,
    placeholder?: string,
    value?: string,
}
export default function Modifinginput({text,placeholder,value}: Props) {
  return (
    <div className='flex ml-3 gap-2'>
            <h1>{text}</h1> <input value={value} type="text" className=' max-w-fit appearance-none bg-transparent outline-none' placeholder={placeholder}/>
        </div>
  )
}
