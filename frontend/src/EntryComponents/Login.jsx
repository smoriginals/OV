import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react';
import API from '../utility/AxiosInstance';

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const HandleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Email & Password is required');
            return
        }

        try {
            setLoading(true)
            const res = await API.post('/api/user/login', formData, { withCredentials: true });
            console.log("Login Response:", res.data);
            if (res?.data?.success) {
                navigate('/home');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login Failed');
        } finally {
            setLoading(false);
        }

    }

    return (


        <>

            <Card className="animate-in fade-in slide-in-from-left-4 mx-auto w-auto duration-500">

                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        <p className="text-muted-foreground text-center text-sm">
                            Don't have an account?
                            <Link to='/signup' className='px-1 font-semibold text-cyan-500'>Sign Up</Link>
                        </p>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={HandleSubmit} className=''>

                        <div>

                            <div className="">
                                <Label htmlFor="email" className='text-xs font-semibold'>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="h-12"
                                />
                            </div>

                            <div className="">

                                <Label htmlFor="password" className='text-xs font-semibold'>Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="h-12"
                                />
                                <Link to='/reset-password' className='relative text-xs text-gray-600'>Reset Password</Link>
                            </div>
                        </div>

                        <div className='mt-8 flex flex-col space-y-1'>

                            {error && <p className="py-2 text-center text-sm text-red-500">{error}</p>}

                            <Button
                                type="submit"
                                className="h-10 w-full"
                                disabled={loading}
                            >
                                {loading ? <LoaderCircle className='animate-spin' /> : "Login"}
                            </Button>

                            <Button variant="outline" className="h-10 w-full border-gray-300">
                                Login with Google
                            </Button>

                        </div>
                    </form>
                </CardContent>

            </Card>

        </>
    )
}