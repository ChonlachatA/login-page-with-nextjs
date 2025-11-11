'use client'
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { registerService } from '../service';

// import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useRouter();

  const [msgWarning, setMsgWarning] = useState('')

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataInput = {
      username: data.username,
      password: data.password,
    };

    if (dataInput.password === data.confirmPassword) {
      setMsgWarning('')
      const res = await registerService(JSON.stringify(dataInput))
      if (res.resCode === '201') {
        navigate.push('/login')
      } else {
        setMsgWarning(res.msg)
      }
    } else {
      setMsgWarning('Password does not match');
    }
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-red-300 to-red-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75">
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 h-[700px]">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        </div>
        <div className="flex w-full px-8 md:px-32 lg:px-24 justify-center">
          <form
            className="bg-white rounded-md shadow-2xl p-5 w-full lg:max-w-md"
            onSubmit={onSubmit}
          >
            <h1 className="text-red-700 font-bold text-2xl my-5 text-center"> Create your account </h1>
            <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md">
              <input
                id="username"
                className=" pl-2 w-full outline-none border-none bg-zinc-50"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md ">
              <input
                className="pl-2 w-full outline-none border-none bg-zinc-50"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md ">
              <input
                className="pl-2 w-full outline-none border-none bg-zinc-50"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleOnChange}
              />
            </div>
            <div>
              {msgWarning != '' &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="font-bold">{msgWarning}</span>
                </div>
              }
            </div>
            <button
              type="submit"
              className="block w-11/12 bg-red-500 mx-auto mt-5 py-2 rounded-2xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2 cursor-pointer"
            >
              Create
            </button>
            <div className="bg-red-600 w-full h-0.5 mt-9 shadow-md" />
            <div className="flex justify-center mt-6 mb-8">
              <span className="text-sm ml-2">
                Did you have account ?{' '}
                <Link
                  href="login"
                  className="hover:text-red-600 underline underline-offset-4"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-red-300 to-red-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75">
        </div>
      </div>
    </div>
  );
}
