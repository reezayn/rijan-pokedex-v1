import React from 'react'
import { FaGithub, FaLink, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import Link from 'next/link'

const OtherLinks = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex flex-col bottom-0 left-7 fixed text-white">
        <Link href='/'>
          <div className="my-2 cursor-pointer">
            <AiFillHome size={33} />
          </div>
        </Link>
        <div className="bg-white h-16 w-[2px] ml-[14px]"></div>
        <div className="my-2">
          <FaGithub size={30} />
        </div>
        <div className="my-2">
          <FaLink size={25} />
        </div>
        <div className="bg-white h-28 w-[2px] ml-[10px]"></div>
      </div>
    </div>
  )
}

export default OtherLinks
