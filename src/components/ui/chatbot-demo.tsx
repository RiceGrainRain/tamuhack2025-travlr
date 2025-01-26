import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `You said: ${inputText}`,
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);

    setInputText('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-xl mx-auto border rounded-lg shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map(message => (
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
      <div className="flex p-2 border-t">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
        />
        <button 
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;