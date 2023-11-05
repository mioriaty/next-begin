import { checkUserLimit, checkUserSubscription, incrementUserLimit } from '@/lib/user-limit';
import { auth } from '@clerk/nextjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const config = {
  apiKey: process.env.OPENAI_API_KEY!,
};

const openai = new OpenAI(config);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse('Miss Open AI key', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const reachToLimit = await checkUserLimit();
    const isPro = await checkUserSubscription();

    if (!reachToLimit && !isPro) {
      return NextResponse.json({ message: 'Your usage limit has been reached', status: 403 }, { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      async onCompletion() {
        // incre count every request success till MAX_COUNT = 5
        if (!isPro) {
          await incrementUserLimit();
        }
      },
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status },
      );
    } else {
      throw error;
    }
  }
}
