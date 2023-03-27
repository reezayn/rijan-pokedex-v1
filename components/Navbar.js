import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="h-14 p-2 pt-16 flex items-center justify-center bg-transparent">
      <Link href="/">
        <Image src="/logo.png" alt="rijan-pokedex-logo" width={200} height={100} />
      </Link>
    </div>
  )
}

export default Navbar
