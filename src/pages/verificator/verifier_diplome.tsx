import React from 'react'
import DiplomeView from '../../components/verificator/diplomes/diplomeview'
import SideNav from '../../components/sidenav'
import VerificatorLayout from '../../layouts/dashboards/Verificator'

export default function verifier_diplome () {
  return (
    <VerificatorLayout>
      <DiplomeView />
    </VerificatorLayout>
  )
}
