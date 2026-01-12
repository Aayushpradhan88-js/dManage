"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IRegister } from './registerTypes';
import { APIAuth } from '@/src/lib/store/slices/auth/authSlice';
import { useAppDispatch } from '@/src/lib/store/hooks/customHook';

function Register() {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  console.log("userData", userData);

  const handlRegisterSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(APIAuth.register(userData));
  };
  console.log("userData on submit", userData);

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          {/* <Image className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="image"/> */}
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <form onSubmit={handlRegisterSubmission} className="space-y-6" method="POST">

            {/* username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1">
                <input value={userData.username}  onChange={handleChange} name="username" type="username" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input value={userData.email}   onChange={handleChange} name="email" type="email-address" autoComplete="email-address" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input value={userData.password} onChange={handleChange} name="password" type="password" autoComplete="password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
              </div>
            </div>

            {/* Submit Btn */}
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"> submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;