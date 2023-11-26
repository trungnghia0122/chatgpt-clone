'use client'

import { db } from '@/firebase';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react'
import useSWR from 'swr';

type Props = {
    chatId: string;
}

function ChatInput({ chatId }: Props) {

    const [prompt, setPrompt] = useState("");

    const { data: session } = useSession();

    const { data: model } = useSWR('model', { fallbackData: 'text-davinci-003' })

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
            } else {
                console.error("Fetch error: ", response.status);
            }
        } catch (error) {
            console.error("Network error: ", error);
        }
    }

    return (
        <div className='text-white mr-5 rounded-lg w-full max-w-[50rem] text-sm border-gray-700 border'>
            <form onSubmit={sendMessage} className='py-2 px-3 space-x-5 flex items-center m-1'>
                <input type='text' className='w-2 resize-none scrollbar-hide focus:outline-none flex-1 bg-transparent' 
                value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Message ChatGPT...' />

                <button disabled={!prompt || !session} type='submit' className={`${!prompt ? 'bg-gray-500' : 'bg-white cursor-pointer'} p-2 rounded-lg`}>
                    <ArrowUpIcon className='text-black h-4 w-4' />
                </button>
            </form>
        </div>
    )
}

export default ChatInput