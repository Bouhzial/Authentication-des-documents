import React, { useState } from 'react'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Input from '../generic/input'

interface Props {
    role_id: number[]
}
export default function AuthForm ({ role_id }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // router.pathname

        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            //sgm t3 issuer w t3 verificateur
            role: role_id[0],
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        }
        if (result?.ok) {
            router.reload()
        }
    }

    return (
        <form className='space-y-8 w-full md:min-w-[350px] md:max-w-[600px]' onSubmit={handleSubmit}>
            {!!error && <p className="text-error">{error}</p>}

            <Input placeholder='Email' type='email' icon={faEnvelope} onChange={(e) => { setEmail(e.target.value) }} ></Input>

            <Input placeholder='Password' type='password' icon={faLock} onChange={(e) => { setPassword(e.target.value) }} ></Input>

            <Link href="/auth/restore_password"><p className="text-center text-xs text-link-text-blue mt-3">Mot de passe oublié ?</p></Link>

            <button className='w-full h-16 border-none bg-link-text-blue text-white rounded-2xl'>Login</button>
        </form>
    )
}
