import React, { useState, useEffect, useRef } from 'react';
import ChatSubmitButton from './ui/ChatSubmitButton'; // Import the ChatSubmitButton component

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
    alert(response);  // Display the AI response as an alert in the parent
  };

  // Clear the input after submitting
  const clearInput = () => {
    setUserQuestion(''); // Reset userQuestion state to clear the input field
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
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
      <div className="flex p-2 border-t">
        <input
          id="userQuestion"
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        />
        <div className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
          <ChatSubmitButton
            userQuestion={userQuestion}
            setAiResponse={handleSetAiResponse} // Pass the response handler to the button
            clearInput={clearInput} // Pass the clearInput function to the button
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
