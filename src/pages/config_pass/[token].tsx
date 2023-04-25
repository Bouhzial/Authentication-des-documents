import { faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import router from 'next/router';
import { api } from '../../utils/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { prisma } from '../../server/db'

export default function Pass_config (params: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const setPass = api.auth.passwordManagement.ConfigPassword.useMutation()

  const [password, setPassword] = React.useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('')
  const [err, setErr] = React.useState<boolean>(false)
  const [errmsg, setErrmsg] = React.useState<string>('')
  const [showPassword, setshowPassword] = React.useState<boolean>(false)
  const [showPasswordConfirm, setshowPasswordConfirm] = React.useState<boolean>(false)

  function handelChange (e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setPassword(val)
  }
  function handelChangeConfirme (e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setPasswordConfirm(val)
  }
  function handleSubmit () {
    if (password != passwordConfirm) {
      setErr(true)
      setErrmsg('Les mots de passe ne sont pas identiques')
      return
    }
    if (isPasswordValid(password)) {
      const data = {
        token: params.token,
        password
      }
      setPass.mutateAsync(data)
      router.push('/auth')
    } else { setErr(true) }

  }
  function isPasswordValid (password: string) {
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) { setErrmsg('Le mot de passe doit contenir au moins une majuscule'); return false }
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) { setErrmsg('Le mot de passe doit contenir au moins une minuscule'); return false }
    const hasNumber = /\d/.test(password);
    if (!hasNumber) { setErrmsg('Le mot de passe doit contenir au moins un chiffre'); return false }
    if (password.length < 8) { setErrmsg('Le mot de passe doit contenir au moins 8 caractères'); return false }
    return true
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center text-link-text-blue'>
      <div className='flex my-5 text-5xl font-bold'>
        <h1>Bonjour&nbsp;</h1>
      </div>
      <h2 className='text-3xl '>Veuillez configurer votre mot de passe</h2>
      <div className='col-span-2 w-1/2 h-16 text-black text-lg font-medium m-4'>
        <input onClick={() => setErr(false)} type={showPassword ? 'text' : 'password'} onChange={handelChange} placeholder="Mot de passe" className='border border-gray-200 w-full outline-none text-lg font-medium h-16 py-3 px-10 rounded-xl shadow-xl pointer-events-auto  focus:shadow-2xl transition-all ' />
        <FontAwesomeIcon onClick={() => { setshowPassword(!showPassword) }} icon={faEye} className='cursor-pointer relative h-6 bottom-2/3 left-[90%]' />
      </div>
      <div className='col-span-2 w-1/2 h-16 text-black text-lg font-medium m-4'>
        <input onClick={() => setErr(false)} type={showPasswordConfirm ? 'text' : 'password'} onChange={handelChangeConfirme} placeholder="Confirme le mot de passe" className='border border-gray-200 w-full outline-none text-lg font-medium h-16 py-3 px-10 rounded-xl shadow-xl pointer-events-auto  focus:shadow-2xl transition-all ' />
        <FontAwesomeIcon onClick={() => { setshowPasswordConfirm(!showPasswordConfirm) }} icon={faEye} className='cursor-pointer relative h-6 bottom-2/3 left-[90%]' />
      </div>

      {err && <p className='text-red-500'>{errmsg}</p>}
      <button onClick={handleSubmit} className='bg-link-text-blue text-white text-xl font-semibold w-1/4 h-12 my-10 rounded-xl shadow-xl hover:shadow-2xl transition-all'>Valider</button>
    </div>
  )
}
export async function getServerSideProps (context: GetServerSidePropsContext<{ token: string }>) {

  const token = context?.params?.token;
  if (!token)
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }

  const passwordConfiguration = await prisma.passwordConfiguration.findFirst({
    where: {
      token
    }
  })
  console.log(!passwordConfiguration , passwordConfiguration?.used , passwordConfiguration?.expires );
  
  if (!passwordConfiguration || passwordConfiguration?.used || passwordConfiguration?.expires < new Date()) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {
      token,
    },
  };
}

