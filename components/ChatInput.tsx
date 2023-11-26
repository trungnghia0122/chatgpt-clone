'use client'

import { db } from '@/firebase';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react'

type Props = {
    chatId: string;
}

function ChatInput({ chatId }: Props) {

    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    const model = 'text-davinci-003';

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;
        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
            }
        }

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message
        )

        try {
            const response = await fetch("/api/askQuestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: input,
                    chatId,
                    model,
                    session,
                }),
            });

            if (response.ok) {
                console.log("successful");
                // You can also process the response data here if needed
            } else {
                console.error("Fetch error: ", response.status);
                // Handle HTTP errors
            }
        } catch (error) {
            console.error("Network error: ", error);
            // Handle network errors
        }
    }

    return (
        <div className='text-white mr-4 rounded-lg w-[100%] max-w-[50rem] text-sm border-gray-700 border'>
            <form onSubmit={sendMessage} className='py-2 px-3 space-x-5 flex m-1'>
                <input className='focus:outline-none flex-1 bg-transparent' value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    type="text" placeholder='Message ChatGPT...' />

                <button disabled={!prompt || !session} type='submit' className={`${!prompt ? 'bg-gray-500' : 'bg-white cursor-pointer'} p-2 rounded-lg`}>
                    <ArrowUpIcon className='text-black h-4 w-4' />
                </button>
            </form>
        </div>
    )
}

export default ChatInput