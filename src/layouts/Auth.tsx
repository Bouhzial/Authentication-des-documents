import React from 'react'
import AuthForm from '../components/auth/Form';
interface Props {
    image: string;
    subText: string;
    role_id: number[];
}
export default function AuthLayout ({ image, subText, role_id }: Props) {
    return (
        <div className='flex flex-col w-full min-h-screen max-w-[1800px] mx-auto md:flex-row'>

            <div className="image flex-1 flex justify-center items-center ">
                <img className="w-3/4 max-w-[600px] min-w-[200px]" src={image} alt="Super admin illustration" />
            </div>

            <div className="form flex md:justify-center items-center flex-col flex-1 w-full space-y-10 text-center md:text-left ">
                <div className="text w-4/5 md:min-w-[350px] md:max-w-[600px] space-y-5">
                    <h1 className='font-semibold text-5xl'>Bienvenue</h1>
                    <p className='text-sm font-light'>{subText}</p>
                </div>
                <AuthForm role_id={role_id} />
            </div>
        </div >
    )
}
