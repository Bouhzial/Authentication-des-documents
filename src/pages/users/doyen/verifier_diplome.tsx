import React from 'react'
import DiplomeView from '../../../../components/doyen/diplomeview'
import SideNav from '../../../../components/sidenav'

export default function verifier_diplome() {
  return (
    <div className='flex w-full'>
      <SideNav name="Mohamed" image_link="/Rafik.jpg" options={[{name:"Verifier Diplomes",link:"verifier_diplome"}]}/>
      <DiplomeView />
    </div>
  )
}