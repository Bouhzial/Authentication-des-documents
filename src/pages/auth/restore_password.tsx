import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import emailjs from 'emailjs-com';
import { api } from '../../utils/api';
export default function restorePassword () {
  const [email, setEmail] = React.useState('')
  const [errmsg, setErrmsg] = React.useState('')
  const [placeholder, setPlaceholder] = React.useState('Entrez votre code pour continue')
  const [code, setCode] = React.useState('')
  const [err, setErr] = React.useState(false)
  const [change, setChange] = React.useState(true)
  const [randomNumber, setRandomNumber] = React.useState(0)
  const [id, setId] = React.useState(0)
  const setPass = api.recteur.users.removePassword.useMutation()
  const EmailExist = api.recteur.users.checkEmailValidity.useMutation()
  function changeEmail (e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  async function handleSubmit () {
    if (!validateEmail(email)) {
      setErrmsg('Email non valide')
      setErr(true)
      return
    }
    if (email) {
      const exist = await EmailExist.mutateAsync(email)
      if (!exist) {
        setErrmsg('Email non existant')
        setErr(true)
        return
      }
      setId(exist)
      setPass.mutateAsync(email)
      const n = Math.floor(Math.random() * 1000000)
      setRandomNumber(n)
      emailjs.send("service_occzbjn", "template_iilkxi9", {
        code: n,
        email: email,
      }, 'QId1k8EKVDSE9fRVS');
      setChange(false);
    }
  }
  function validateEmail (email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function HandelChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value)
    if (code.length > 6) {
      e.target.value = code.slice(0, 6)
    }
  }
  function Check () {
    if (parseInt(code) === randomNumber) {
      console.log('ok')
      window.location.replace(`/config_pass/${id}`)
    }
    else {
      setErr(true)
      setErrmsg('Code incorrect')
    }
  }
  return (
    <div>{change ?
      <div className='h-screen flex flex-col items-center justify-center text-link-text-blue'>
        <h1 className='text-5xl p-5 font-bold text-black'>Récupération de mot de pass</h1>
        <div className='col-span-2 w-1/2 h-16 text-black text-lg font-medium m-4'>
          <input onClick={() => { setErr(false) }} type='email' onChange={changeEmail} placeholder="Entrez votre email pour continue" className='border border-gray-200 w-full outline-none text-lg font-medium h-16 py-3 px-10 rounded-xl shadow-xl pointer-events-auto  focus:shadow-2xl transition-all ' />
          <FontAwesomeIcon icon={faEnvelope} className='cursor-pointer relative h-6 bottom-2/3 left-[90%]' />
        </div>
        {err && <p className='text-red-500'>{errmsg}</p>}
        <button onClick={() => handleSubmit()} className='bg-link-text-blue text-white text-xl font-semibold w-1/4 h-12 my-10 rounded-xl shadow-xl hover:shadow-2xl transition-all'>Continuer</button>
      </div>
      :
      <div className='h-screen flex flex-col items-center justify-center text-link-text-blue'>
        <h1 className='text-5xl p-5 font-bold text-black'>Entrez votre code de récupération</h1>

        <input maxLength={6} onBlur={() => { setPlaceholder('Entrez votre code pour continue') }} onFocus={() => { setPlaceholder('') }} onChange={HandelChange} type='number' placeholder={placeholder} className='border m-8 text-center border-gray-200 w-[40%] outline-none text-lg font-medium h-16 py-3 px-10 rounded-xl shadow-xl pointer-events-auto  focus:shadow-2xl transition-all ' />
        {err && <p className='text-red-500'>{errmsg}</p>}
        <button onClick={Check} className='bg-link-text-blue text-white text-xl font-semibold w-1/4 h-12 my-10 rounded-xl shadow-xl hover:shadow-2xl transition-all'>Vérifier</button>
      </div>
    }


    </div>
  )
}
