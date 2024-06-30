'use client';

import { useEffect, useState }  from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { UserType } from '@/models/user.model';


export default function UserProfile({ params }: any) {

    const [user, setUser] = useState<Partial<UserType>>({ username: '', email: '', password: '', role : '' })

    useEffect(() =>{
        ( async() =>{
            try{
                const response = await axios.get(`/api/profile/${params.userid}`)
                const data = await response.data
                console.log('from fronteb=nd',data)
                if(!data.success){
                    toast.error(data.error)
                }
                setUser(prev =>({...prev, ...data.user}))
            }catch(err : unknown){
                toast.error('Something went wrong')
                console.log((err as Error).message)
            }
        })()
    },[params.userid])
    return (
        <div className="p-7 bg-[#EBF4F6] h-screen">
            <h1 className="text-center text-5xl font-serif font-semibold text-[#402E7A] ">
                User Profile
            </h1>

            <div className=" border-4 border-black/25 mt-7 h-[80%] w-full py-11 px-20  bg-[#fff] rounded-lg shadow-md text-gray-800" >
                <span>Username : {user.username}</span>
            </div>
        </div>
    );
}
