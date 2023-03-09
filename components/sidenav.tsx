import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
interface linknav{
    
        name: string;
        link: string;
    
}
interface Props {
    name: string;
    image_link: string;
    options : linknav[];
}
export default function SideNav({name,image_link,options}:Props) {
  return (
    <div className='flex flex-col justify-between w-1/5 min-w-fit h-screen'>
        <div className='flex flex-col bg-primary-gray items-center h-5/6'>
             <div className='flex flex-col items-center mt-10 '>
                <img src={image_link} className='w-20 h-20 rounded-full'/>
                <p className='text-link-text-blue text-xl mt-2 font-bold'>{name}</p>
            </div>
        <div className='flex flex-col mt-14 w-full text-3xl align-middle font-bold cursor-pointer'>
        {options && options.map((option:linknav,key:number) => {
              return (
                <a className='text-link-text-blue px-6 hover:scale-x-105 hover:shadow-2xl hover:text-link-gray transition-all hover:bg-blue-900 duration-300 border-b border-gray-400 h-16 w-full bg-link-gray flex items-center justify-center' href={option.link}>
                {option.name}
            </a>
              )})}
        </div>    
    </div>
    
    <div className='flex hover:bg-blue-900 items-center justify-center bg-link-text-blue text-white h-16 text-lg font-medium cursor-pointer'>
   <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2 rotate-180'/>
    SE DECONECTER  
    </div>
    </div> 
  )
}