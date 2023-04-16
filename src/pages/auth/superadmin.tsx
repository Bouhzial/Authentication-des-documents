import React from 'react'
import Input from '../../components/generic/input'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import AuthLayout from '../../layouts/Auth'

export default function superadmin () {
    return (
        <AuthLayout role_id={[1]} subText='Gerer votre etablissement et le staff' image="/images/auth/superadmin.png" />
    )
}
