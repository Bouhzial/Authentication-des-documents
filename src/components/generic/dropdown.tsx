import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
    className?: string;
    options: string[];
    optionsValues?: number[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string | number;

}
export default function Dropdown ({ options, optionsValues, onChange, value, className }: Props) {
    const [clicked, setClicked] = React.useState(false);

    return (
        <div className={`h-16 col-span-2 text-red text-lg font-medium relative ${className || 'w-2/3'} rounded-2xl border border-gray-50`} onFocus={() => { setClicked(true) }} onBlur={() => { setClicked(false) }}>
            <select onChange={onChange} value={value} className={`cursor-pointer bg-white w-full h-16 outline-none text-lg font-medium py-3 px-5 rounded-2xl shadow-lg pointer-events-auto focus:shadow-xl transition-all ${value == '-1' ? 'text-gray-500' : ''}`}>
                {options.map((option, index) => (
                    index === 0 ? <option selected value={-1}>{option}</option> :
                        <option className='bg-blue text-black' value={optionsValues ? optionsValues[index - 1] : index}>{option}</option>
                ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} style={{ pointerEvents: 'none' }} className={`absolute h-6 top-1/3 right-[20px] ${clicked ? 'rotate-180 transition-all' : "rotate-0 transition-all"}`} />
        </div >
    )
}