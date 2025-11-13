'use client'
import {
  useEffect,
  useState,
} from 'react';

import * as jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  changePasswordService,
  deleteUserService,
} from '../service';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [msgWarning, setMsgWarning] = useState('');
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('web-idp-token');
    const payload = jwt.decode(token);
    setUser(payload);
  }, []);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onClickDeleted = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await deleteUserService(user.id)
    setLoading(false)
    if (res.resCode === '200') {
      localStorage.removeItem('web-idp-token');
      navigate.push('/login')
    } else {
      setMsgWarning(res.data.msg)
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsgWarning('');
    const dataInput = {
      username: user.username,
      oldPassword: data.oldPassword,
      password: data.newPassword,
    };

    if (!dataInput.password || !data.newPassword || !data.oldPassword) {
      setMsgWarning('Please fill out all field')
    } else {
      if (dataInput.password === data.confirmPassword) {
        setLoading(true)
        const res = await changePasswordService(user.id, JSON.stringify(dataInput))
        setLoading(false)
        if (res.resCode === '200') {
          navigate.push('/')
        } else {
          setMsgWarning(res.data.msg)
        }
      } else {
        setLoading(false)
        setMsgWarning('Password does not match');
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
            <h1 className="text-red-700 font-bold text-2xl my-5 text-center"> Change Your Password </h1>
            <div className="flex items-center bg-zinc-200 shadow-sm mb-8 py-2 px-3 rounded-md">
              <input
                id="username"
                className="pl-2 w-full outline-none border-none bg-zinc-200 font-bold"
                type="text"
                name="username"
                placeholder={user.username}
                disabled
              />
            </div>
            <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md ">
              <input
                className="pl-2 w-full outline-none border-none bg-zinc-50"
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Old Password"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex items-center bg-zinc-50 shadow-md mb-8 py-2 px-3 rounded-md ">
              <input
                className="pl-2 w-full outline-none border-none bg-zinc-50"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
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
            {loading ? (
              <span className="flex justify-center block w-11/12 bg-red-400 mx-auto mt-5 py-2 rounded-2xl text-white font-semibold mb-2">
                Loading ...
              </span>
            ) : (
              <button
                type="submit"
                className="block w-11/12 bg-red-500 mx-auto mt-5 py-2 rounded-2xl hover:bg-red-800 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2 cursor-pointer"
              >
                Confirm
              </button>
            )
            }
            <div className="bg-red-600 w-full h-0.5 mt-9 shadow-md" />
            <div className="flex justify-between items-center my-2 w-full">
              <span className="text-sm py-2">
                <Link
                  href="/"
                  className="hover:text-red-600 underline underline-offset-4"
                >
                  back to homepage
                </Link>
              </span>
              {!loading &&
                <button
                  className="block text-sm w-30 bg-red-200 py-2 rounded-xl hover:bg-red-300 hover:text-white transition-all duration-500 text-red-400 font-semibold cursor-pointer"
                  onClick={onClickDeleted}
                >
                  Delete User
                </button>
              }
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
