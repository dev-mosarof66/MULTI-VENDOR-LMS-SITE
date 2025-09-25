'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";


const ThemeSetter = () => {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <div
            className='cursor-pointer p-2 border text-sm sm:text-base text-gray-800 dark:text-white  border-purple-700 rounded-full hover:bg-purple-600/30 active:scale-[0.95] duration-500 delay-75'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} >
            {
                theme === 'dark' ? <MdLightMode  /> : <MdDarkMode   />
            }
        </div>
    )


}
export default ThemeSetter