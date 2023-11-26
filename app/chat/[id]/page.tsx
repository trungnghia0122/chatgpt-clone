import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type Props = {
    params: {
        id: string
    }
}

function ChatPage({ params: { id } }: Props) {
    return (
        <div className="flex flex-col justify-center h-screen 
         bg-[#343541] px-10 py-10">

            <Chat chatId={id} />
            <div className="flex justify-center items-center mb-10">
                <ChatInput chatId={id} />
            </div>


        </div>
    )
}

export default ChatPage;