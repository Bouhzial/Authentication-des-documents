import React from 'react'
import DiplomeCreation from '../../components/issuer/DiplomeCreation/Main'
import StudentLayout from '../../layouts/dashboards/Student'
import ConsulterDiplomes from '../../components/student/Consulter_diplomes'

export default function consulter_diplome () {
    return (
        <StudentLayout>
            <ConsulterDiplomes />
        </StudentLayout>
    )
}
