'use client'
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { loginService } from '../service';

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [msgWarning, setMsgWarning] = useState('')
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const navigate = useRouter();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsgWarning('')
    setLoading(true)
    const dataInput = {
      username: data.username,
      password: data.password,
    };

    if (!dataInput.username || !dataInput.password) {
      setLoading(false)
      setMsgWarning('Please fill out all field')
    } else {
      const res = await loginService(JSON.stringify(dataInput))
      if (res.resCode !== '200') {
        setMsgWarning(res.msg)
      } else {
        setLoading(false)
        localStorage.setItem('web-idp-token', dataInput.username)
        navigate.push('/')
      }
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
            <h1 className="text-red-700 font-bold text-2xl my-5 text-center"> Welcome Back !! </h1>
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
            <div>
              {msgWarning != '' &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="font-bold">{msgWarning}</span>
                </div>
              }
            </div>
            {loading ? (
              <span className="flex justify-center block w-11/12 bg-red-400 mx-auto mt-5 py-2 rounded-2xl text-white font-semibold mb-2">
                Loading ...
              </span>
              ) : (
                <button
                  type="submit"
                  className="block w-11/12 bg-red-500 mx-auto mt-5 py-2 rounded-2xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2 cursor-pointer"
                >
                  Login
                </button>
              )
            }
            <div className="bg-red-600 w-full h-0.5 mt-9 shadow-md" />
            <div className="flex justify-center mt-6 mb-8">
              <span className="text-sm ml-2">
                Need an account ?{' '}
                <Link
                  href="/register"
                  className="hover:text-red-600 underline underline-offset-4"
                >
                  create now
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