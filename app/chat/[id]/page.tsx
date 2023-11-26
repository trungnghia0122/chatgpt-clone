import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
    params: {
        id:string
    }
}

function ChatPage({params : {id}} : Props) {
    return (
        <div className="flex flex-col justify-center items-center h-screen 
         bg-[#343541] px-10 py-10">

        <Chat chatId={id} />
        <ChatInput chatId={id} />

        </div>
    )
}

export default ChatPage;