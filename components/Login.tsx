'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"
import chatgptlogo from '@/public/openai-logo.png'

export function Login() {
    return (
        <div className="bg-white h-screen flex flex-col justify-center items-center space-y-5 text-center">

            <Image
                className="mb-10"
                src={chatgptlogo}
                width={50}
                height={50}
                alt="logo"
            />
            <span className="text-3xl text-black font-bold">Welcome to ChatGPT</span>
            <span className="text-xl text-black ">Log in with your OpenAI account to continue</span>

            <div className="space-x-4">
                <button onClick={() => signIn("google")}
                    className="rounded-lg px-4 py-3 bg-gray-700/50 hover:bg-gray-700 transition-all 
                ease-out duration-200 text-sm text-black">Log in</button>
                <button onClick={() => signIn("google")}
                    className="rounded-lg px-4 py-3 bg-gray-700/50 hover:bg-gray-700 transition-all 
                ease-out duration-200  text-sm text-black">Sign up</button>
            </div>



        </div>
    )
}