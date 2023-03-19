import Link from 'next/link';
import React from 'react'


export default function index() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center space-y-10 py-20 items-center">
            <div className="text-center  space-y-4">
                <h1 className="text-4xl mx-4 md:text-5xl font-semi-bold">Bienvenue a BlockAuth  </h1>

                <p>Continuer en tant que :</p>
            </div>

            {/* cards */}
            <div className="container flex justify-center flex-wrap items-center space-y-10 md:space-y-0 mx-14">
                <Card title="Etudiant" image="/images/auth/student.png" link="/auth/student" />
                <Card title="Recteur" image="/images/auth/superadmin.png" link="/auth/superadmin" />
                <Card title="Administrateur" image="/images/auth/administrator.png" link="/auth/administrator" />

            </div>

        </div>

    )
}


type cardProps = {
    title: string;
    image: string;
    link: string;
}
function Card({ title, image, link }: cardProps) {
    return (
        <div className="flex-1 flex justify-center items-center">
            <Link className="w-full" href={link}>
                <div className="p-10 w-10/12 m-auto shadow-xl rounded-2xl max-w-md flex flex-col justify-between items-center border border-gray-50 hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                    <img className="p-4 w-full xs:h-52 xs:w-auto max-w-none" src={image} alt={title} />
                    <h1 className='text-2xl font-bold text-gray-600'>{title}</h1>
                </div>
            </Link>
        </div>
    )
}