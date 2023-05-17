import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCertificate, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
interface linknav {

  name: string;
  link: string;
  icon?: IconDefinition
}
interface Props {
  name: string;
  image_link: string;
  options: linknav[];
  toggled?: (open: boolean) => void;
}
export default function SideNav ({ name, image_link, toggled, options }: Props) {
  const { data: session } = useSession();

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  return (
    <div className={`flex flex-col bg-primary-gray justify-between ${open ? 'w-[350px] max-w-[600px] ' : 'w-14'} transition-all h-screen fixed left-0 top-0 z-50`}>
      <div className='flex flex-col  items-center h-5/6'>
        <div className='flex flex-col items-center mt-10 '>
          <Image src={!session?.user?.image ? `/${session?.user?.image?.path}` : "/default.png"}
            width={100}
            height={100}
            onClick={() => { setOpen(!open); toggled && toggled(!open) }}
            className={`${open ? 'w-20 h-20' : 'w-10 h-10'} rounded-full transition-all`} alt="profile Pic"
          />
          {open && <p className='text-link-text-blue text-xl mt-2 font-bold'>{`${session?.user?.prenom} ${session?.user?.nom}`}</p>}
        </div>
        <div className='flex flex-col mt-14 w-full text-xl  align-middle  h-1/5 cursor-pointer'>
          {options && options.map(({ name, icon, link }: linknav, key: number) => (
            <Link className={`text-link-text-blue p-3 w-full  flex items-center justify-center ${router.route == link ? 'bg-link-gray' : ''}`} href={link}>
              <div className={`w-3/4 max-w-[200px] flex items-center ${open ? 'justify-between' : 'justify-center'} mx-auto`}>
                {icon && <FontAwesomeIcon icon={icon} />}
                {open && name}
              </div>
            </Link>
          )
          )}
        </div>
      </div>
      <div className='flex flex-col-reverse h-1/5'>
        <div className='flex items-center justify-center bg-link-text-blue text-white h-1/2 text-lg cursor-pointer' onClick={() => signOut()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2 rotate-180' />
          {open && 'se Deconnecter'}
        </div>
      </div>
    </div>
  )
}