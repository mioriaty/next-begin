'use client';

import AIResponse from '@/components/dashboard/ai-response';
import MarkdownResponse from '@/components/dashboard/markdown-response';
import ToolsNavigation from '@/components/dashboard/tools-navigation';
import UserMessage from '@/components/dashboard/user-message';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { useRef } from 'react';

const ConversationPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, setMessages } = useChat({
    api: '/api/conversation',
  });

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-full relative flex flex-col justify-between">
      <div ref={containerRef} className="overflow-y-auto space-y-10 scroll-smooth h-[calc(100vh-180px)]">
        {messages.length > 0 ? (
          <>
            {messages.map(msg => (
              <div key={msg.id} className="whitespace-pre-wrap">
                {msg.role === 'user' ? (
                  <UserMessage>
                    <MarkdownResponse content={msg.content} />
                  </UserMessage>
                ) : (
                  <AIResponse>
                    <MarkdownResponse content={msg.content} />
                  </AIResponse>
                )}
              </div>
            ))}
            <div className="absolute left-0 bottom-20 text-right w-full pr-3">
              <Button size={'sm'} variant="outline" onClick={handleClearChat}>
                Clear chat
              </Button>
            </div>
          </>
        ) : (
          <ToolsNavigation title="Conversation" />
        )}
      </div>
      <div className="mb-[13px]">
        <form onSubmit={isLoading ? stop : handleSubmit} className="flex items-center w-full relative">
          <Textarea
            placeholder="Do you have any questions today?"
            value={input}
            onChange={handleInputChange}
            className="min-h-[80px] resize-none"
          />
          <Button type="submit" disabled={!input} className="absolute right-2 gradient-btn">
            {isLoading ? 'Stop' : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
