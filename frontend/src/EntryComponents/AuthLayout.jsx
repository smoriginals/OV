import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <>
            <div className="flex h-dvh items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

                <Outlet />
            </div>
        </>
    )
}