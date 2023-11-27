'use client'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { db } from '@/firebase';
import Image from 'next/image'
import chatgptlogo from '@/public/openai-logo.png'

function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();

    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"), {
            userId: session?.user?.email!,
            createdAt: serverTimestamp()
        }
        )

        router.push(`/chat/${doc.id}`)
    }

    return (
        <div onClick={createNewChat} className='text-white items-center flex justify-between 
            min-w-[14rem] border-gray-700 chatRow mb-5' >
            <div className='flex items-center space-x-2'>
                <Image
                    className="rounded-full object-fit"
                    src={chatgptlogo}
                    width={30}
                    height={30}
                    alt="logo"
                />
                <p>ChatGPT</p>
            </div>

            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 
                    16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 
                    0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

            </div>
        </div>
    )
}

export default NewChat;