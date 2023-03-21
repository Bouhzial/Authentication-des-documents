import React from 'react'
import SideNav from '../../components/sidenav'
import UserForm from '../../components/utilisateurform'
import SuperAdminLayout from '../../layouts/dashboards/SuperAdmin'

export default function create_users () {
  return (
    <SuperAdminLayout>
      <UserForm />
    </SuperAdminLayout>
  )
}
