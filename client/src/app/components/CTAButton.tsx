'use client'
import Link from 'next/link'
import React from 'react'
import { FaUser } from 'react-icons/fa'

type CTAProps = {
}

function CTAButton({ }: CTAProps) {
    return (
        <div className="relative">
            <Link
                href={'/login'}
                className="flex items-center justify-center text-gray-800 dark:text-white p-2 border border-purple-500 rounded-full cursor-pointer hover:border-purple-700 active:scale-[0.95] duration-500 delay-75"
            >
                <FaUser className='text-sm sm:text-base' />
            </Link>
        </div>
    )
}

export default CTAButton