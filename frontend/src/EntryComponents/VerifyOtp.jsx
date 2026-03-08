import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';

export default function VerifyOtp({ onVerifySuccess, email }) {

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const HandleVerify = async () => {

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

    const HandleResendOtp = async () => {

        try {
            setLoading(true);
            setError('');

            const res = await axios.post(
                'http://localhost:5000/api/user/resend-otp',
                { email },
                { withCredentials: true }
            );

            if (res.data.success) {
                setOtp(''); // clear previous OTP
                alert(res.data.message || "OTP resent successfully");
            }

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to resend OTP"
            );
        } finally {
            setLoading(false);
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

                    <span className='text-xs text-blue-500 hover:cursor-pointer' onClick={HandleResendOtp}>Resend OTP</span>

                    {error && (<p className="text-center text-xs text-red-500">{error}</p>)}

                </div>
            </div>

            <Button className='mt-6 h-12 w-full' onClick={HandleVerify} disabled={otp.length !== 6 || loading}>
                {loading ? <LoaderCircle className='animate-spin' /> : "Verify"}
            </Button>
        </>
    )
}
