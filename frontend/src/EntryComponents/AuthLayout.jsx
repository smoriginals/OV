import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <>
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
                <div className="w-[400px] rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                    <Outlet />
                </div>
            </div>
        </>
    )
}