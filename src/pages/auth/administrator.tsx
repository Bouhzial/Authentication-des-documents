import React from 'react'
import Input from '../../components/generic/input'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import AuthLayout from '../../layouts/Auth'

export default function administrator () {
    return (
        <AuthLayout role_id={2} subText='Créer et verifier les diplomes' image="/images/auth/administrator.png" />
    )
}
