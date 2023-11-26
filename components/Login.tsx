'use client'

import {signIn} from "next-auth/react"
import Image from "next/image"

export function Login () {
    return (
        <div className="bg-[#11A37F] h-screen flex flex-col justify-center items-center text-center">
            
            <Image 
                src="https://links.papareact.com/2i6"
                width={300}
                height={300}
                alt="logo"
            />
            <button onClick={() => signIn("google")} className="text-3xl text-white font-bold animate-pulse ">Sign In</button>

        </div>
    )
}