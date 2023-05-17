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

  const [val, setValue] = React.useState<string>('')
  function handelChange (e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    onChange(e)
  }

  return (
    <div className={`h-16 text-red text-lg font-medium relative ${className || 'w-2/3'}`}>
      <input type={type} onChange={handelChange} placeholder={placeholder} className='w-full outline-none text-lg font-medium h-16 py-3 px-5 rounded-xl shadow-lg pointer-events-auto  focus:shadow-xl transition-all ' />
      <FontAwesomeIcon icon={icon} className='cursor-pointer relative h-6 bottom-2/3 left-[85%]' />
    </div>
  )
}