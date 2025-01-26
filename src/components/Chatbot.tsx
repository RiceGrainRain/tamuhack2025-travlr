import React, { useState, useEffect, useRef } from 'react';
import ChatSubmitButton from './ui/ChatSubmitButton';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSetAiResponse = (response: string) => {
    setAiResponse(response);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: response, sender: 'bot' },
    ]);
  };

  const handleSubmit = () => {
    if (userQuestion.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: userQuestion, sender: 'user' },
      ]);

      setUserQuestion('');
    }
  };

  return (
    <div className="flex flex-col h-[750px] w-[775px] mx-auto">
      <div className="flex-grow overflow-y-auto p-2 space-y-2 border rounded-lg bg-white shadow-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-2 border-t bg-gray-100">
        <input
          id="userQuestion"
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        />
        <ChatSubmitButton
          userQuestion={userQuestion}
          setAiResponse={handleSetAiResponse}
          clearInput={() => setUserQuestion('')}
        />
      </div>
    </div>
  );
};

export default Chatbot;