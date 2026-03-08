import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link ,useNavigate} from 'react-router-dom'
export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            alert("All fields are required")
            return
        }

        setLoading(true)

        // simulate API call
        setTimeout(() => {
            console.log("Login Data:", formData)
            setLoading(false)
        }, 1000)
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
                    <form onSubmit={handleSubmit} className="">

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
                            <Button
                                type="submit"
                                className="h-10 w-full"
                                disabled={loading}
                                onClick={() => {navigate('/home') } }
                            >
                                {loading ? "Logging in..." : "Login"}
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