
import query from '@/lib/queryApi';
import admin from "firebase-admin"
import { adminDb } from '@/firebaseAdmin';
import { NextRequest } from 'next/server';

export async function POST(req:NextRequest) {

    const { prompt, chatId, model, session } = await req.json();

    //chatgpt query
    const response = await query(prompt, model)                                                                                                                                                                                                                                                                                                                                                                                                             

    const message: Message = {
        text: response || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),     
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "/openai-logo.png",
        },
    }

    await adminDb
        .collection('users')
        .doc(session?.user?.email)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message)

    return new Response(JSON.stringify({ answer: message.text }))
    
}