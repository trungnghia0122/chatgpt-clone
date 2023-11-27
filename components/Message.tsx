'use client'

import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';

type Props = {
    message: DocumentData;
}

function Message({ message }: Props) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = message.text.split(' ');
    const isChatGPT = message.user.name === "ChatGPT";

    useEffect(() => {
        if (isChatGPT && currentWordIndex < words.length) {
            const timer = setTimeout(() => {
                setCurrentWordIndex(currentWordIndex + 1);
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isChatGPT, currentWordIndex, words]);

    return (
        <div className="text-white py-4">
            <div className="flex flex-col space-x-5 max-w-2xl mx-auto">
                <div className="flex space-x-2">
                    <img src={message.user.avatar} alt="user" className="h-6 w-6 rounded-full" />
                    <p className="font-bold">{isChatGPT ? "ChatGPT" : "You"}</p>
                </div>

                <div className='text-sm px-3 leading-6'>
                    {!isChatGPT && (
                        <p className="text-sm px-3 leading-6">{message.text}</p>
                    )}
                    {isChatGPT && (
                        words.slice(0, currentWordIndex).join(' ')
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message;
