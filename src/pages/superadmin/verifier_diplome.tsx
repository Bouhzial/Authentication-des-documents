import React from 'react'
import DiplomeView from '../../components/recteur/diplomes/diplomeview'
import SideNav from '../../components/sidenav'
import SuperAdminLayout from '../../layouts/dashboards/SuperAdmin'

export default function verifier_diplome () {
  return (
    <SuperAdminLayout>
      <DiplomeView />
    </SuperAdminLayout>
  )
}
