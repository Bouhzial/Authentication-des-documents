import React, { useState } from 'react'
import Input from '../generic/input'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function AuthForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            role: 1,
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        }
        if (result?.ok) {
            router.push("/");
        }
    }

    return (
        <form className='space-y-8 w-4/5 md:min-w-[350px] md:max-w-[600px]' onSubmit={handleSubmit}>
            {!!error && <p className="text-error">{error}</p>}

            <Input className="w-full" placeholder='Email' type='email' icon={faEnvelope} value={email} onChange={(e) => { setEmail(e.target.value) }} ></Input>

            <Input className="w-full" placeholder='Password' type='password' icon={faLock} value={password} onChange={(e) => { setPassword(e.target?.value) }} ></Input>

            <Link href="#"><p className="text-center text-xs text-link-text-blue mt-3">Mot de passe oublié ?</p></Link>

            <button className='w-full h-16 border-none bg-link-text-blue text-white rounded-2xl'>Login</button>
        </form>
    )
}
