import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
export default function HomePage({ onLogout }) {
    const [bubbles, setBubbles] = useState([])

    useEffect(() => {
        const generated = Array.from({ length: 20 }).map(() => ({
            left: Math.random() * 100,
            size: 40 + Math.random() * 60,
            duration: 6 + Math.random() * 6,
            delay: Math.random() * 5,
        }))

        setBubbles(generated)
    }, [])

    const navigate = useNavigate();

    const LogOut = (e) => {
        e.preventDefault();
        navigate('/login');
    }


    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">

            {/* Animated Bubbles */}
            {bubbles.map((bubble, index) => (
                <motion.div
                    key={index}
                    className="bottom-[-150px] absolute rounded-full bg-white/10 blur-sm"
                    style={{
                        left: `${bubble.left}%`,
                        width: bubble.size,
                        height: bubble.size,
                    }}
                    animate={{
                        y: "-120vh",
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: bubble.duration,
                        delay: bubble.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-[350px] rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
            >
                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    Welcome Home
                </h1>

                <Button
                    onClick={onLogout || LogOut}
                    className="h-12 w-full bg-white text-lg font-semibold text-indigo-700 transition hover:bg-gray-100"
                >
                    Logout
                </Button>
            </motion.div>
        </div>
    )
}