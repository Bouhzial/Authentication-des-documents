import { faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import router from 'next/router';
import { api } from '../../utils/api';

export default function Pass_config (params: any) {
  const [user, setUser] = React.useState<any>(null)
  const [setted, setSetted] = React.useState<boolean>(false)
  const mutation = api.recteur.users.getUserById.useMutation()
  const setPass = api.recteur.users.ConfigPassword.useMutation()
  useEffect(() => {
    async function Get_data () {
      const id = parseInt(params.name)
      const User = await mutation.mutateAsync(id)
      if (User.password != '') {
        setSetted(true)
      }
      setUser(User)

    }
    Get_data()
  }, [])

  const [value, setValue] = React.useState<string>('')
  const [valueConfirme, setValueConfirme] = React.useState<string>('')
  const [err, setErr] = React.useState<boolean>(false)
  const [errmsg, setErrmsg] = React.useState<string>('')
  const [showPassword, setshowPassword] = React.useState<boolean>(false)
  function handelChange (e: any) {
    const val = e.target.value
    setValue(val)
  }
  function handelChangeConfirme (e: any) {
    const val = e.target.value
    setValueConfirme(val)
  }
  function handleSubmit () {
    if (value != valueConfirme) {
      setErr(true)
      setErrmsg('Les mots de passe ne sont pas identiques')
      return
    }
    if (isPasswordValid(value)) {
      const data = {
        id: parseInt(params.name),
        password: value
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

  setted ? router.push('/auth') : null
  return (
    <div className='h-screen flex flex-col items-center justify-center text-link-text-blue'>
      <div className='flex my-5 text-5xl font-bold'>
        <h1>Bonjour&nbsp;</h1>
        <h1 className='text-blue-900'>{user ? user.nom : ""}</h1>
      </div>
      <h2 className='text-3xl '>veuillez configurer votre mot de passe</h2>
      <div className='col-span-2 w-1/2 h-16 text-black text-lg font-medium m-4'>
        <input onClick={() => setErr(false)} type={showPassword ? 'text' : 'password'} onChange={handelChange} placeholder="Mot de passe" className='border border-gray-200 w-full outline-none text-lg font-medium h-16 py-3 px-10 rounded-xl shadow-xl pointer-events-auto  focus:shadow-2xl transition-all ' />
        <FontAwesomeIcon onClick={() => { setshowPassword(!showPassword) }} icon={faEye} className='cursor-pointer relative h-6 bottom-2/3 left-[90%]' />
      </div>
      <div className='col-span-2 w-1/2 h-16 text-black text-lg font-medium m-4'>
        <input onClick={() => setErr(false)} type={showPassword ? 'text' : 'password'} onChange={handelChangeConfirme} placeholder="Confirme le mot de passe" className='border border-gray-200 w-full outline-none text-lg font-medium h-16 py-3 px-10 rounded-xl shadow-xl pointer-events-auto  focus:shadow-2xl transition-all ' />
        <FontAwesomeIcon onClick={() => { setshowPassword(!showPassword) }} icon={faEye} className='cursor-pointer relative h-6 bottom-2/3 left-[90%]' />
      </div>

      {err && <p className='text-red-500'>{errmsg}</p>}
      <button onClick={handleSubmit} className='bg-link-text-blue text-white text-xl font-semibold w-1/4 h-12 my-10 rounded-xl shadow-xl hover:shadow-2xl transition-all'>Valider</button>
    </div>
  )
}
export async function getServerSideProps (context: any) {
  const { params } = context;
  const { name } = params;
  return {
    props: {
      name,
    },
  };
}

