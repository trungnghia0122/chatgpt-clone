'use client'

import { DocumentData } from 'firebase/firestore';

type Props = {
    message: DocumentData;
}

function Message({ message }: Props) {
    const isChatGPT = message.user.name === "ChatGPT";

    return (
        <div className="text-white py-4">
            <div className="flex flex-col space-x-5 max-w-2xl mx-auto">
                <div className="flex space-x-2">
                    <img src={message.user.avatar} alt="user" className="h-6 w-6 rounded-full" />
                    <p className="font-bold">{isChatGPT ? "ChatGPT" : "You"}</p>
                </div>
                <div className='text-sm px-3 leading-6'>
                        <p>{message.text}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;

