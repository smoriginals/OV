import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from 'axios';


export default function ForgetPass() {

    const [formData, setFormData] = useState({ email: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const [step, setStep] = useState("email"); // email | otp
    const [otp, setOtp] = useState('');
    const [cooldown, setCooldown] = useState(0);



    useEffect(() => {
        if (cooldown === 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            setLoading(true);

            // STEP 1 → SEND OTP
            if (step === "email") {
                const res = await axios.post('http://localhost:5000/api/user/forget-password', formData);
                if (res.data.success) {
                    setStep("otp");
                    setCooldown(60); // start timer
                    setSuccess("OTP sent to your email");
                }


            }
            // STEP 2 → VERIFY OR RESEND
            else if (step === "otp") {

                // if cooldown finished → resend
                if (cooldown === 0) {
                    const res = await axios.post(
                        'http://localhost:5000/api/user/forget-password',
                        { email: formData.email }
                    );

                    if (res.data.success) {
                        setCooldown(60);
                        setOtp('');
                        setSuccess("OTP resent");
                    }
                }
                // else → verify OTP
                else {
                    const res = await axios.post(
                        'http://localhost:5000/api/user/verify',
                        { email: formData.email, otp }
                    );

                    if (res.data.success) {
                        setSuccess("OTP verified");
                        // next step → reset password page
                    }
                }

            }

            else if (step === 'create-new-password') {
                if (!cooldown) {
                    console.log("Proceed to reset password with OTP:", otp);
                }
            }

        }
        catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    // Disable button when:
    // - loading
    // - on otp step, cooldown active but otp not fully entered
    const isDisabled = loading || (step === "otp" && cooldown > 0 && otp.length !== 6);



    return (
        <>
            <Card className="animate-in fade-in slide-in-from-left-4 mx-auto w-96 duration-500">

                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">
                        Forgot Password
                    </CardTitle>
                    <CardDescription>
                        <p className="text-muted-foreground text-center text-sm">
                            Enter your email to receive a verification code for password reset.
                        </p>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/*<form onSubmit={handleSubmit}>*/}

                    {/*    <div>*/}
                    {/*        <div className="">*/}
                    {/*            <div className=''>*/}

                    {/*                <Label htmlFor="email" className="px-1 text-sm font-semibold">Email</Label>*/}
                    {/*                {*/}
                    {/*                    step === "email" && (*/}

                    {/*                        <Input*/}
                    {/*                            id="email"*/}
                    {/*                            name="email"*/}
                    {/*                            type="email"*/}
                    {/*                            placeholder="example@email.com"*/}
                    {/*                            value={formData.email}*/}
                    {/*                            onChange={handleChange}*/}
                    {/*                            required*/}
                    {/*                            className="h-12 border border-gray-300"*/}
                    {/*                        />*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            </div>*/}

                    {/*            <div className='hidden'>*/}
                    {/*                <Field className="mx-auto w-fit py-2">*/}
                    {/*                    {*/}
                    {/*                        step === "otp" && (*/}

                    {/*                            <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>*/}
                    {/*                                <InputOTPGroup>*/}
                    {/*                                    <InputOTPSlot index={0} />*/}
                    {/*                                    <InputOTPSlot index={1} />*/}
                    {/*                                    <InputOTPSlot index={2} />*/}
                    {/*                                    <InputOTPSlot index={3} />*/}
                    {/*                                    <InputOTPSlot index={4} />*/}
                    {/*                                    <InputOTPSlot index={5} />*/}
                    {/*                                </InputOTPGroup>*/}
                    {/*                            </InputOTP>*/}
                    {/*                        )*/}
                    {/*                    }*/}
                    {/*                </Field>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}

                    {/*    <div className="mt-8 flex flex-col space-y-1">*/}

                    {/*        {error && (*/}
                    {/*            <p className="py-2 text-center text-sm text-red-500">{error}</p>*/}
                    {/*        )}*/}

                    {/*        {success && (*/}
                    {/*            <p className="py-2 text-center text-sm text-blue-500">{success}</p>*/}
                    {/*        )}*/}

                    {/*        <Button disabled={loading || (step === "otp" && otp.length !== 6 && cooldown !== 0)}>*/}
                    {/*            {loading ? (*/}
                    {/*                <LoaderCircle className="animate-spin" />*/}
                    {/*            ) : step === "email" ? (*/}
                    {/*                "Send OTP"*/}
                    {/*            ) : cooldown === 0 ? (*/}
                    {/*                "Resend OTP"*/}
                    {/*            ) : (*/}
                    {/*                "Verify OTP"*/}
                    {/*            )}*/}
                    {/*        </Button>*/}

                    {/*        <Button*/}
                    {/*            variant="outline"*/}
                    {/*            className="h-10 w-full border-gray-300"*/}
                    {/*            asChild*/}
                    {/*        >*/}
                    {/*            <Link to="/login">*/}
                    {/*                <ArrowLeft className="text-md mr-2 h-4 w-4 font-semibold" />*/}
                    {/*                Back to Login*/}
                    {/*            </Link>*/}
                    {/*        </Button>*/}

                    {/*    </div>*/}

                    {/*</form>*/}

                    <form onSubmit={handleSubmit}>

                        {/* STEP 1 — Email input */}
                        {step === "email" && (
                            <div>
                                <Label htmlFor="email" className="px-1 text-sm font-semibold">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="h-12 border border-gray-300"
                                />
                            </div>
                        )}

                        {/* STEP 2 — OTP input */}
                        {step === "otp" && (
                            <div className="space-y-3">
                                <p className="text-muted-foreground text-center text-sm">
                                    Enter the 6-digit code sent to{" "}
                                    <span className="text-foreground font-semibold">{formData.email}</span>
                                </p>

                                <Field className="mx-auto w-fit py-2">
                                    <InputOTP
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        value={otp}
                                        onChange={setOtp}  // ✅ controlled
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </Field>

                                {/* Cooldown timer */}
                                {cooldown > 0 && (
                                    <p className="text-muted-foreground text-center text-xs">
                                        Resend available in{" "}
                                        <span className="text-foreground font-semibold">{cooldown}s</span>
                                    </p>
                                )}
                            </div>
                        )}

                        {
                            step === "create-new-password" && (
                                <div>
                                    <Label htmlFor="password" className='text-xs font-semibold'>New Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="New Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="h-12"
                                    />
                                </div>
                            )

                        }

                        <div className="mt-8 flex flex-col space-y-1">
                            {error && <p className="py-2 text-center text-sm text-red-500">{error}</p>}
                            {success && <p className="py-2 text-center text-sm text-blue-500">{success}</p>}

                            <Button disabled={isDisabled}>
                                {loading ? (
                                    <LoaderCircle className="animate-spin" />
                                ) : step === "email" ? (
                                    "Send OTP"
                                ) : cooldown === 0 ? (
                                    "Resend OTP"
                                ) : (
                                    "Verify OTP"
                                )}
                            </Button>

                            <Button variant="outline" className="h-10 w-full border-gray-300" asChild>
                                <Link to="/login">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Login
                                </Link>
                            </Button>
                        </div>

                    </form>


                </CardContent>

            </Card>
        </>
    );
}