import React from 'react'
import Input from '../../components/generic/input'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import AuthLayout from '../../layouts/Auth'

export default function student () {
    return (
        <AuthLayout subText='Voir et Consulter vos diplomes' image="/images/auth/student.png" />
    )
}
