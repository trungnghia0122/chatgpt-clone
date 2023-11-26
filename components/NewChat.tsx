'use client'

import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { db } from '@/firebase';

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
        //changes the route of page when clicking new route
        router.push(`/chat/${doc.id}`)
    }

    return (
        <div onClick={createNewChat} className='min-w-[14rem] border-gray-700 border chatRow mb-5' >
            <PlusIcon className='h-4 w-4' />
            <p>New Chat</p>
        </div>
    )
}

export default NewChat;