'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Page() {

    const router = useRouter();

    const handleSubmit = async () :Promise<void> => {
        if( password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }

        const token = window.location.search.split('=')[1];

        const response = await axios.post(`/api/recoveryPassword?token=${token}`, {password})
        const data = await response.data;

        if(data.error){
            toast.error(data.error);
            return;
        }

        toast.success(data.message);
        router.push('/login');
    }

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    return (
        <div className="m-auto w-[80%] h-[80%] ">
            <h1 className="text-3xl font-semibold text-center p-11">
                Password Recovery
            </h1>
            <div className="bg-gray-500/20 w-[35rem] h-[25rem] m-auto shadow-xl shadow-white rounded-lg">
                <div className="flex p-2 gap-1">
                    <div className="">
                        <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
                    </div>
                    <div className="circle">
                        <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
                    </div>
                    <div className="circle">
                        <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
                    </div>
                </div>
                <div className="card__content text-lg flex flex-col justify-center items-between p-11 gap-7 mt-7 font-mono ">
                    <div className="flex gap-[6.5rem] items-center">
                        <label htmlFor="password">Password</label>
                        <input
                            className="px-4 py-2 rounded-xl text-black focus:outline-none"
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-6 items-center">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="px-4 py-2 rounded-xl focus:outline-none text-black"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="bg-blue-600 py-2 px-4 mt-5 w-40 mx-auto rounded-lg font-semibold text-center">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
