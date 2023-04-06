import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string | number;

}
export default function Dropdown ({ options, onChange, value }: Props) {
    const [clicked, setClicked] = React.useState(false);

    return (
        <div className='col-span-2 text-black w-2/3 h-16 mx-4 hover:cursor-pointer' onClick={() => { setClicked(!clicked) }}>
            <select onChange={onChange} value={value} className='cursor-pointer w-full h-16 outline-none text-lg font-medium py-3 px-5 rounded-xl shadow-lg pointer-events-auto focus:shadow-xl transition-all '>
                {options.map((option, index) => (
                    index === 0 ? <option disabled selected value={-1}>{option}</option> :
                        <option className='bg-blue' value={index}>{option}</option>
                ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} style={{ pointerEvents: 'none' }} className={`relative h-6 bottom-2/3 left-[85%] ${clicked ? 'rotate-180 transition-all' : "rotate-0 transition-all"}`} />
        </div>
    )
}