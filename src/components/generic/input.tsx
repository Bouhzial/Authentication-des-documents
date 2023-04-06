import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { devNull } from 'os';
import React from 'react'


interface Props {
    className?: string;
    type: string;
    placeholder: string;
    icon: IconDefinition;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
}
export default function Input ({ className, type, placeholder, icon, onChange, value }: Props) {

    return (
        <div className={`h-16 text-red text-lg font-medium relative ${className || 'w-96'}`}>
            <input type={type} onChange={onChange} placeholder={placeholder} value={value} className='w-full outline-none text-lg font-medium h-16 py-3 px-5  rounded-2xl shadow-lg pointer-events-auto  focus:shadow-xl transition-all' />
            <FontAwesomeIcon icon={icon} className='absolute cursor-pointer h-6 top-1/3 right-5' />
        </div>
    )
}