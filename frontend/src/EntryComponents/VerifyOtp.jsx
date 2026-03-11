import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function VerifyOtp({ onVerifySuccess, email }) {

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {

        if (cooldown === 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [cooldown]);

    const HandleVerify = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            alert('Enter 6 Digit OTP')
            return;
        }

        try {
            setLoading(true);
            setError('');
            const res = await axios.post('http://localhost:5000/api/user/verify', { email, otp }, { withCredentials: true });
            if (res.data.success) {
                onVerifySuccess();
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to verify OTP');
        }
        finally {
            setLoading(false);
        }
    }

    const HandleResendOtp = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            setResending(true);
            setError('');

            const res = await axios.post(
                'http://localhost:5000/api/user/resend',
                { email },
                { withCredentials: true }
            );
            console.log("Resend OTP Response:", res.data);
            if (res?.data?.success) {
                setOtp(''); // clear previous OTP
                setCooldown(60); // start 60 second timer

            }

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to resend OTP"
            );
        } finally {
            setResending(false);
        }
    }


    return (
        <>
            <div className='animate-in fade-in slide-in-from-left-4 flex h-full flex-col items-center justify-center space-y-2 duration-300'>
                <p className='px-2 text-center text-gray-600'>Enter OTP to Verify</p>

                <div>
                    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                        <InputOTPGroup>

                            <InputOTPSlot index={0} className='border-gray-400 transition-all duration-200 focus:border-primary focus:ring-primary/40 focus:scale-110 focus:ring-2' />
                            <InputOTPSlot index={1} className='border-gray-400 transition-all duration-200 focus:border-primary focus:ring-primary/40 focus:scale-110 focus:ring-2' />
                            <InputOTPSlot index={2} className='border-gray-400 transition-all duration-200 focus:border-primary focus:ring-primary/40 focus:scale-110 focus:ring-2' />
                            <InputOTPSlot index={3} className='border-gray-400 transition-all duration-200 focus:border-primary focus:ring-primary/40 focus:scale-110 focus:ring-2' />
                            <InputOTPSlot index={4} className='border-gray-400 transition-all duration-200 focus:border-primary focus:ring-primary/40 focus:scale-110 focus:ring-2' />
                            <InputOTPSlot index={5} className='border-gray-400 transition-all duration-200 focus:border-primary focus:ring-primary/40 focus:scale-110 focus:ring-2' />

                        </InputOTPGroup>
                    </InputOTP>

                    {/*Resend OTP*/}

                    <div className={`text-xs flex  py-0.5 justify-between items-center ${cooldown > 0 ? "text-gray-500" : "text-blue-500 cursor-pointer"}`}
                        onClick={cooldown === 0 && !resending ? HandleResendOtp : undefined}
                    >

                        <p>
                            {resending
                                ? "Sending..."
                                : cooldown > 0
                                    ? `Resend OTP in ${cooldown}s`
                                    : "Resend OTP"}
                        </p>
                        {error && (<p className="pr-0.5 text-center text-xs text-red-500">{error}</p>)}

                    </div>


                </div>
            </div>

            <Button className='mt-6 h-12 w-full' onClick={HandleVerify} disabled={otp.length !== 6 || loading}>
                {loading ? <LoaderCircle className='animate-spin' /> : "Verify"}
            </Button>
        </>
    )
}
