import React from 'react'
import { Button } from "@/components/ui/button"
import Signup from './EntryComponents/Signup'
import { Routes, Route,Navigate } from 'react-router-dom';
import Login from './EntryComponents/Login';
import HomePage from './Home/HomePage';
import AuthLayout from './EntryComponents/AuthLayout';
import PublicRoute from './utility/PublicRoute';

export default function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<PublicRoute><AuthLayout /></PublicRoute>}>

                    <Route index element={<Navigate to='/login' replace/> }/>
                    {/*<Route index element={<Signup />} />*/}
                    <Route path='signup' element={<Signup />} />
                    <Route path='login' element={<Login />} />
                </Route>
                <Route path='/home' element={<PublicRoute><HomePage /></PublicRoute>} />
            </Routes>
        </>
    )
}

