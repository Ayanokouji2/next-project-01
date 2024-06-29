'use client';

import Link from 'next/link';
import axios from 'axios';
import React from 'react';

import Image from 'next/image';
export default function page() {
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: '',
    });

    const onSignup = async () => {};

    return (
        <main className=" h-screen overflow-hidden">
            <div className="h-full rounded-xl bg-[#F5F9FC] ">
                <div className="text-blue-600 font-bold text-center text-2xl py-7">
                    <p>Sign up</p>
                    <span className="text-gray-400 font-normal text-base">
                        Join the community Today!
                    </span>
                </div>

                <button className="w-full flex justify-center ">
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
                <p className="mt-5 text-gray-500/60 text-center font-bold">
                    or
                </p>

                <div className=" flex flex-col gap-5 justify-center items-center text-gray-400 font-normal text-base  w-[30rem] shadow-xl mx-auto rounded-lg mt-3 p-5 bg-white">
                    <div className="flex justify-between px-11 items-center w-full">
                        <label htmlFor="username">username</label>
                        <input
                            className="focus:outline-none shadow-inner bg-black/5 border-b-2 focus:border-b-blue-300 text-black/80 font-semibold p-2 rounded-lg "
                            type="text"
                            id="username"
                            value={user.username}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="flex justify-between px-11 items-center w-full">
                        <label htmlFor="email">email</label>
                        <input
                            className="focus:outline-none shadow-inner bg-black/5 border-b-2 focus:border-b-blue-300 text-black/80 font-semibold p-2 rounded-lg "
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="flex justify-between px-11 items-center w-full">
                        <label htmlFor="password">password</label>
                        <input
                            className="focus:outline-none shadow-inner bg-black/5 border-b-2 focus:border-b-blue-300 text-black/80 font-semibold p-2 rounded-lg "
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <button
                        className="bg-blue-600 py-2 px-4 rounded-lg text-white font-mono font-semibold"
                        onClick={onSignup}
                    >
                        Sign up
                    </button>

                    <p className="font-mono">
                        Already a user?{' '}
                        <Link
                            href="/login"
                            className="text-blue-500 font-semibold font-mono"
                        >
                            login
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </main>
    );
}
