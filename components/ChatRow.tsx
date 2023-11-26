import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

type Props = {
    id: string;
}

function ChatRow({ id }: Props) {

    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        collection(db, "users", session?.user?.email!, "chats", id,
            "messages"),
    )

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(id));
    }, [id, pathname]);

    const removeChat = async () => {
        await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id,))
        router.replace('/')
    }

    return (
        <Link href={`/chat/${id}`} className={`max-w-[14rem] chatRow justify-between ${active && 'bg-gray-700/50'} `} >
            <div className="whitespace-nowrap overflow-hidden">
                <p className="flex-1 inline-flex max-w-[10rem]">{messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}</p>
            </div>
            <TrashIcon onClick={removeChat} className='h-5 w-5 text-gray-700 hover:text-red-500' />
        </Link>
    )
}

export default ChatRow