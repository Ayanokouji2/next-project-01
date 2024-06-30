'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

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
        <main className="text-center  mt-5 text-3xl font-semibold text-white">
            <h1>Profile Page</h1>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-5"
                onClick={handleLogout}
            >
                Logout
            </button>
        </main>
    );
}
