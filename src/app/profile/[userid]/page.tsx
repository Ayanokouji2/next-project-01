'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserType } from '@/models/user.model';
import Image from 'next/image';

export default function UserProfile({ params }: any) {
    const [user, setUser] = useState<Partial<UserType>>({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `/api/profile/${params.userid}`
                );
                const data = await response.data;
                console.log('from fronteb=nd', data);
                if (!data.success) {
                    toast.error(data.error);
                }
                setUser((prev) => ({ ...prev, ...data.user }));
            } catch (err: unknown) {
                toast.error('Something went wrong');
                console.log((err as Error).message);
            }
        })();
    }, [params.userid]);
    return (
        <div className="p-7 bg-[#EBF4F6] h-screen">
            <h1 className="text-center text-5xl font-serif font-semibold text-[#402E7A] ">
                User Profile
            </h1>

            <div className="flex gap-11 w-[90%] border shadow-2xl p-7 m-7 mx-auto justify-center h-[80%]">
                <div className="p-11 flex flex-col gap-5 justify-center items-start text-3xl font-mono font-semibold ">
                    <h1 className="text-black/70">
                        {' '}
                        username : {user.username}
                    </h1>
                    <h1 className="text-black/70"> email : {user.email}</h1>
                    <h1 className="text-black/70"> role : {user.role}</h1>
                </div>
                <Image
                    className="bg-green-200/30 p-11 rounded-full shadow-inner "
                    src="/image.png"
                    width={450}
                    height={256}
                    alt="user_profile_image"
                />
            </div>
        </div>
    );
}
