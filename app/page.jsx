'use client'
import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const navigate = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('web-idp-token')
    if (!token) {
      navigate.push('/login');
    };
  }, [])

  const clickLogout = () => {
    localStorage.removeItem('web-idp-token');
    navigate.push('/login');
  };

  return (
    <>
      {/* Navbar */}
      <header className="absolute fixed top-0 left-0 right-0 z-50 inset-x-0">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <img src="/awareLogo.png" alt="" className="h-10 w-auto" />
          </div>
          <div className="flex items-center justify-end">
            <Link href="/profile">
              <img
                alt="User Profile"
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-white/10 mr-2 hover:shadow-xl cursor-pointer"
              />
            </Link>

            <span
              className="text-sm/6 font-semibold text-gray-900 hover:text-red-800 hover:underline cursor-pointer"
              onClick={clickLogout}
            >
              Log Out <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </nav>
      </header>

      {/* First Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-red-300 to-red-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75">
          </div>
        </div>
        <div className="mx-auto max-w-5xl py-20">
          <div className="flex flex-col text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              About
              <span className="text-red-800"> Aware</span>
            </h1>
            <div className="flex justify-center">
              <img
                src="/awareImage.png"
                alt="awareAbout"
                className="my-25 max-w-full"
              />
            </div>
            <div className="mt-2 text-lg text-left font-medium text-pretty text-gray-500 sm:text-xl/8">
              <p className="mb-5">With swift growth came complexity. As orders kept pouring in 1999, our trading and logistics start-up struggled to manage all the moving pieces. Clients wanted real-time updates. Sales needed inventory insight. Suppliers required visibility.</p>
              <p className="mb-5">No off-the-shelf software met these needs. So, our founder rolled up his sleeves to develop customized applications that solved the challenges through technology.</p>
              <p className="mb-5">Seeing the need for better business operations software, he created a division focused on developing accessible solutions.</p>
              <p className="mb-5">In 2003, the division spun off as “Aware” - a company developed to understand business needs and drive progress through purpose-built tools for the future.</p>
              <p className="mb-5">Thanks to that beginning, today we:</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-red-300 to-red-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75">
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="relative">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-10">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-red-300 to-red-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
        </div>
        <div className="w-full max-w-7xl mx-auto mb-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://www.aware.co.th/wp-content/uploads/2024/06/DSCF3399-1024x683.jpg"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mt-4 font-bold text-3xl text-gray-700">
              Understand technology's key role in empowering business success.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mt-4 font-bold text-3xl text-gray-700">
              Have 20 years of expertise in solving client's business challenges.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://www.aware.co.th/wp-content/smush-webp/2024/06/Aware-ChiangMai-271-1024x709.jpg.webp"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://www.aware.co.th/wp-content/smush-webp/2024/03/aware-group-photo-1024x683.jpeg.webp"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mt-4 font-bold text-3xl text-gray-700">
              Help companies advance through digital innovation focused ahead.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[-20rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(90%-5rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-red-300 to-red-600 opacity-30 sm:w-288.75" />
        </div>
      </section>
    </>
  );
}
