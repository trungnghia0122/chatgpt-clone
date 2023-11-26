'use client'

import { db } from "@/firebase";
import { query, orderBy, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import Image from "next/image";

type Props = {
    chatId: string;
}

function Chat({ chatId }: Props) {

    const { data: session } = useSession();

    const [messages] = useCollection(session && query(
        collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    ))

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            {messages?.empty && (
                <div className="flex flex-col justify-end h-1/2 items-center space-y-4">
                    <Image
                        className="rounded-full"
                        src="https://links.papareact.com/2i6"
                        width={100}
                        height={100}
                        alt="logo"
                    />
                    <p className="font-bold text-white text-2xl">How can I help you today?</p>
                </div>


            )}


            {messages?.docs.map((message) => (
                <Message key={message.id} message={message.data()} />
            ))}
        </div>
    )
}

export default Chat