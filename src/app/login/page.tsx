'use client';

import Link from 'next/link';
import axios from 'axios';
import React from 'react';

export default function page() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const onLogin = async () => {};

    return (
        <main className=" h-screen overflow-hidden">
            <div className="h-full rounded-xl bg-[#F5F9FC] ">
                <div className="text-blue-600 font-bold text-center text-2xl py-7">
                    <p>Login </p>
                    <span className="text-gray-400 font-normal text-base">
                        Welcome back to community Today!
                    </span>
                </div>

                

                <div className=" flex flex-col gap-5 justify-center items-center text-gray-400 font-normal text-base  w-[30rem] shadow-xl mx-auto rounded-lg mt-3 p-5 bg-white">
                    
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
                        onClick={onLogin}
                    >
                        Login
                    </button>

                    <p className="font-mono">
                        New to community?{' '}
                        <Link
                            href="/signup"
                            className="text-blue-500 font-semibold font-mono"
                        >
                            signup
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </main>
    );
}
