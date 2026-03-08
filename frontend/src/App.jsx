import React from 'react'
import { Button } from "@/components/ui/button"
import Signup from './EntryComponents/Signup'
import { Routes, Route } from 'react-router-dom';
import Login from './EntryComponents/Login';
import HomePage from './Home/HomePage';
import AuthLayout from './EntryComponents/AuthLayout';
export default function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                    <Route path='signup' element={<Signup />} />
                    <Route path='login' element={<Login />} />
                </Route>
                <Route path='/home' element={<HomePage />} />
            </Routes>
        </>
    )
}

