import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
    name: string;
    image_link: string;
    option1: string;
    option2: string;
}
export default function SideNav({name,image_link,option1,option2}:Props) {
  return (
    <div className='flex flex-col justify-between w-1/6 h-screen'>
        <div className='flex flex-col bg-primary-gray items-center h-5/6'>
             <div className='flex flex-col items-center mt-10 '>
                <img src={image_link} className='w-20 h-20 rounded-full'/>
                <p className='text-link-text-blue text-xl mt-2 font-bold'>{name}</p>
            </div>
            <div className='flex flex-col mt-14 w-full text-3xl align-middle font-bold h-1/5 cursor-pointer'>
                <div className='text-link-text-blue w-full bg-link-gray h-1/2 flex items-center justify-center'>
                    {option1}
                </div>
            <div className='text-link-text-gray w-full h-1/2 flex items-center justify-center hover:text-link-text-blue transition'>
                {option2}
            </div>
        </div>    
    </div>
    <div className='flex flex-col-reverse h-1/5'>
    <div className='flex items-center justify-center bg-link-text-blue text-white h-1/2 text-lg font-medium cursor-pointer'>
   <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2 rotate-180'/>
    SE DECONECTER  
    </div>
    </div>
    </div>
    
  )
}