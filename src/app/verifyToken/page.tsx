'use client';

import axios from 'axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function VerifyToken() {

    const router = useRouter()
    useEffect(()=>{
        ( async () =>{
            const token = window.location.search.split('=')[1]
            const response = await axios.get(`/api/verifyToken?token=${token}`)
            const data = await response.data

            console.log(data)

            if(data.success){
                toast.success(data.message)
                console.log(data.user._id)
                router.push(`/profile/${data.user._id}`)
            }
            else{
                toast.error(data.message)
                router.push('/login')
            }
                
        })()

    },[])

    return (
        <div>
            <h1>Verifying your email...</h1>
        </div>
    )
}