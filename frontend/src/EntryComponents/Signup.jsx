import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import VerifyOtp from "../EntryComponents/VerifyOtp"
import Login from "../EntryComponents/Login"
import { Link } from 'react-router-dom';
import API from '../utility/AxiosInstance';


export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [step, setStep] = useState("form") // form | otp

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return;
        }


        try {
            const res = await API.post('/api/user/signup', formData);
            console.log("Signup Response:", res.data);
            if (res?.data?.success) {
                setStep("otp");
                return;
            }
        } catch (error) {
            console.error("Failed to Create Account:", error)
        }

    }

    return (
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-2xl">

                {/* ================= FORM ================= */}
                {step === "form" && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-bold">
                                Create Account
                            </CardTitle>
                            <CardDescription className="text-center">
                                <span>Already have an account?<Link to='/login' className='px-1 font-bold text-blue-500'>Login</Link></span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="">

                                <div className="">
                                    <Label className='text-xs font-semibold'>Username</Label>
                                    <Input
                                        name="username"
                                        placeholder="@username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="h-10 border-gray-400"
                                    />
                                </div>

                                <div className="">
                                    <Label className='text-xs font-semibold'>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="h-10 border-gray-400"
                                    />
                                </div>

                                <div className="">
                                    <Label className='text-xs font-semibold'>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="h-10 border-gray-400"
                                    />
                                </div>

                                <div className="">
                                    <Label className='text-xs font-semibold'>Confirm Password</Label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="h-10 border-gray-400"
                                    />
                                </div>

                                <Button type="submit" className="text-md mt-8 h-10 w-full">
                                    Create
                                </Button>

                            </form>
                        </CardContent>
                    </div>
                )}

                {/* ================= OTP ================= */}
                {step === "otp" && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-bold">
                                Verify OTP
                            </CardTitle>
                            <CardDescription className="text-center text-gray-600">
                                We sent a code to  <p className='text-blue-500'>{formData.email}</p>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col items-center gap-2">
                            <VerifyOtp onVerifySuccess={() => setStep("login")} email={formData.email} />

                            {/*<Button*/}
                            {/*    variant="outline"*/}
                            {/*    className='h-12 w-full border-gray-500'*/}
                            {/*    onClick={() => setStep("form")}*/}
                            {/*>*/}
                            {/*    Back*/}
                            {/*</Button>*/}
                        </CardContent>
                    </div>
                )}

                {step === "login" && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <Login />
                    </div>
                )}

            </Card>


        </div>
    )
}