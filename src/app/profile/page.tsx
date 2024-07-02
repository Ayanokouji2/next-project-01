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
            const response = await axios.post('/api/sendEmail', { user });
            const data = await response.data;
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
            const response = await axios.get('/api/user/logout');
            const data = await response.data;

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
    return (
        <main className="text-center  mt-5 text-3xl font-semibold text-white overflow-hidden">
            <h1>Profile Page</h1>

            {loading ? (
                <Loader />
            ) : verified ? (
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

                    <br />

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
