'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserType } from '@/models/user.model';
import { Loader } from '@/utils/Loader';

export default function Page() {
    const router = useRouter();

    const [verified, setVerified] = useState<boolean>(false);
    const [user, setUser] = useState<Partial<UserType>>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/profile');
                const data = await response.data;

                if (!data.success) {
                    toast.error(data.error);
                    router.push('/login');
                } else {
                    setUser(data.user);
                    setVerified(data?.user?.isverified || false);
                }
            } catch (error: unknown) {
                toast.error(
                    'Something went wrong while fetching profile data ' +
                        (error as Error).message
                );
            }
        })();
    }, [router]);

    const handleVerification = async () => {
        try {
            setLoading(true);
            toast.loading('Sending verification email');
            const response = await axios.post('/api/sendEmail', { user, subject: 'verify' });
            const data = await response.data;
            toast.dismiss();
            if (data.success)
                toast.success(
                    'Verification email sent, please check your email'
                );
            else {
                toast.error(data.error);
            }
        } catch (error: unknown) {
            toast.error('Something went wrong while verifying email');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            toast.loading('Logging out');
            const response = await axios.get('/api/user/logout');
            const data = await response.data;
            toast.dismiss();
            if (!data.success) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                router.push('/');
            }
        } catch (error: unknown) {
            toast.error('Something went wrong while logging out');
        }
    };

    const handleResetPassword = async () :Promise<void>=>{
        try{
            toast.loading('Sending reset password email')
            const response = await axios.post('/api/sendEmail',{user, subject: 'reset'})
            const data = await response.data;

            toast.dismiss()
            if(data.success){
                toast.success('Reset password email sent, please check your email');
            }else{
                toast.error(data.error);
            }
        }
        catch(error:unknown){
            toast.error((error as Error).message );
        }
    }

    return (
        <main className="text-center  mt-5 text-3xl font-semibold text-white overflow-hidden">
            <h1>Profile Page</h1>

            {loading ? (
                <Loader />
            ) : (
                <>
                    {verified ? (
                        <h2 className="text-green-500">Email Verified</h2>
                    ) : (
                        <>
                            <h2 className="text-red-500">Email Not Verified</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
                                onClick={handleVerification}
                            >
                                Click to Verify
                            </button>
                        </>
                    )}
                    <button
                        className={`bg-indigo-600 py-2 px-4 text-white rounded-md `}
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                    <button
                        className="ml-5 bg-red-500 text-white px-4 py-2 rounded-md mt-5"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            )}
        </main>
    );
}
