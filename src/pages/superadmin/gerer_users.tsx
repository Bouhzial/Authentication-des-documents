import React from 'react'
import SideNav from '../../components/sidenav'
import UserDashBoard from '../../components/recteur/users/Userboard'
import SuperAdminLayout from '../../layouts/dashboards/SuperAdmin'


export default function gerer_users () {

  return (
    <SuperAdminLayout>
      <UserDashBoard />
    </SuperAdminLayout>
  )
}
