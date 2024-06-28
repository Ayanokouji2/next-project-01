'use client';

import Link from 'next/link'
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';

import Image from 'next/image';
export default function page() {
    return (
        <main className="p-16 h-[43rem]">
            <div className="h-full rounded-xl bg-[#F5F9FC]">
                <div className="text-blue-600 font-bold text-center text-2xl py-7">
                    <p>Sign up</p>
                    <span className="text-gray-400 font-normal text-base">
                        Join the community Today!
                    </span>
                </div>

                <button className="flex justify-center ">
                    <div className="flex justify-center items-center gap-2 bg-white w-[16rem] p-3 rounded-xl shadow-2xl">
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBSO99IGM1cKZInah4wlYoi20FT7xEc3PPw&s"
                            className="rounded-3xl"
                            alt="google_logo"
                            width={40}
                            height={40}
                        />
                        <p className=" text-blue-600/50 font-semibold">
                            {' '}
                            use google account or
                        </p>
                    </div>
                </button>
            </div>
        </main>
    );
}
