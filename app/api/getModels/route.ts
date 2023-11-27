import { NextResponse } from 'next/server';
import openai from '@/lib/chatgpt';

export async function GET() {

    const models = await openai.models.list().then((res) => res.data);

    const modelOptions = models.map((model) => ({
        value: model.id,
        label: model.id,
    }))

    return NextResponse.json({ modelOptions })
}