import React from 'react'
import { FaGithub, FaLink } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import Link from 'next/link'

const OtherLinks = () => {
  return (
    <>
    <div className="hidden lg:block">
      <div className="flex flex-col bottom-0 left-7 fixed text-white">
        <Link href="/">
          <div className="my-2">
            <AiFillHome size={33} />
          </div>
        </Link>
        <div className="bg-white h-16 w-[2px] ml-[14px]"></div>
        <Link href="https://github.com/reezayn/rijan-pokedex-v1" target='_blank'>
          <div className="my-2">
            <FaGithub size={30} />
          </div>
        </Link>
        <Link href="https://rijanshrestha.com.np/" target='_blank'>
          <div className="my-2">
            <FaLink size={25} />
          </div>
        </Link>
        <div className="bg-white h-28 w-[2px] ml-[10px]"></div>
      </div>
    </div>
    </>
  )
}

export default OtherLinks
