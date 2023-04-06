import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
interface linknav {

  name: string;
  link: string;

}
interface Props {
  name: string;
  image_link: string;
  options: linknav[];
}
export default function SideNav ({ name, image_link, options }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className='flex flex-col bg-primary-gray justify-between w-1/5 max-w-[600px] min-w-[300px] h-screen'>
      <div className='flex flex-col  items-center h-5/6'>
        <div className='flex flex-col items-center mt-10 '>
          <img src={session?.user?.image?.name || "/Rafik.jpg"} className='w-20 h-20 rounded-full' />
          <p className='text-link-text-blue text-xl mt-2 font-bold'>{`${session?.user?.prenom} ${session?.user?.nom}`}</p>
        </div>
        <div className='flex flex-col mt-14 w-full text-xl 2xl:text-3xl align-middle  h-1/5 cursor-pointer'>
          {options && options.map(({ name, link }: linknav, key: number) => (
            <Link className={`text-link-text-blue p-3 w-full  flex items-center justify-center ${router.route == link ? 'bg-link-gray' : ''}`} href={link}>
              {name}
            </Link>
          )
          )}
        </div>
      </div>
      <div className='flex flex-col-reverse h-1/5'>
        <div className='flex items-center justify-center bg-link-text-blue text-white h-1/2 text-lg cursor-pointer' onClick={() => signOut()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2 rotate-180' />
          se Deconnecter
        </div>
      </div>
    </div>
  )
}