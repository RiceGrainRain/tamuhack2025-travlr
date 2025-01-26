// src/App.tsx

import React, { useState } from "react";
import ChatBot from '../../../tamuhack2025-travlr/src/components/ui/chatbot-demo.tsx';
import { Label } from "../../../tamuhack2025-travlr/src/components/ui/labels.tsx";
import { Input } from "../../../tamuhack2025-travlr/src/components/ui/input.tsx";
import { cn } from "../../../tamuhack2025-travlr/src/lib/utils.ts";
import ChatSubmitButton from './ui/ChatSubmitButton';

const ChatbotPage: React.FC = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  
  const handleSetAiResponse = (response: string) => {
    setAiResponse(response);
    alert(response);  // Display the AI response as an alert in the parent
  };
  return (
    
    <div>
      <ChatBot/>
      <LabelInputContainer className="mb-4">
      <Label htmlFor="userQuestion">Your Question</Label>
      <Input
        id="userQuestion"
        placeholder="Enter your question"
        type="text"
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
      />
      </LabelInputContainer>
      <div className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      >
        <ChatSubmitButton
          userQuestion={userQuestion}
          setAiResponse={handleSetAiResponse}
        />
      </div>
    </div>

    
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ChatbotPage;
