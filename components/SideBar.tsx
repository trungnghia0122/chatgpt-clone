'use client'

import NewChat from "./NewChat";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import { useState } from "react";

function SideBar() {
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session && query(
            collection(db, "users", session?.user?.email!, "chats"),
            orderBy("createdAt", "asc")
        )
    );

    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className="flex h-screen bg-[#343541]">
            
                <div id="sidebar" className={`${!isHidden ? 'hidden' : 'relative flex flex-col p-4 bg-[#202123]' } `}>
                    <div className="flex-1">
                        <NewChat />
                        <div>
                            {/* model type */}
                        </div>

                        {/* map through chats */}

                        {chats?.docs.map(chat => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))}


                    </div>

                    {session &&
                        <div className="flex absolute bottom-5 items-center mb-2 ml-2 space-x-2">
                            <img onClick={() => signOut()} className="h-8 w-8 rounded-full 
                        cursor-pointer hover:opacity-50" src={session.user?.image!} alt='profile pic' />
                            <span className="text-white font-bold text-sm">{session.user?.name!}</span>
                        </div>
                    }
                </div>
            

            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" onClick={() => setIsHidden(!isHidden)} className="w-6 h-6 text-black hover:cursor-pointer 
                hover:text-gray-700 transition-all duration-200 ease-out">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </div>

        </div>

    )
}

export default SideBar;