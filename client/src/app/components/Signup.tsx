'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

type SignupProps = {
  title: string
  fields: { name: string; label: string; type: string; placeholder: string }[]
}

type FormValues = {
  [key: string]: string
}

const Signup = ({ title, fields }: SignupProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Signup data:', data)
    // TODO: Implement signup logic
  }

  const handleGoogleSignup = () => {
    console.log('Google signup clicked')
    // TODO: Implement Google OAuth signup
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col relative">
              <label className="text-gray-700 dark:text-gray-200 mb-1">{field.label}</label>
              <input
                {...register(field.name, { required: `${field.label} is required` })}
                type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                placeholder={field.placeholder}
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
              />
              {field.type === 'password' && (
                <div
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </div>
              )}
              {errors[field.name] && (
                <span className="text-red-500 text-sm mt-1">{errors[field.name]?.message}</span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 active:scale-[0.95] transition cursor-pointer duration-300 delay-75"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center w-full border border-gray-300 dark:border-gray-600 py-2 rounded-md gap-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer duration-300 delay-75"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
         <div className="w-full text-sm sm:text-base pt-3 text-black dark:text-white">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-700 hover:text-purple-600 cursor-pointer transition-all duration-300 delay-75"
            >
              Login
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Signup
