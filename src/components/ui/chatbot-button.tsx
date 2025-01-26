import React from "react";
import { MessageSquare } from "lucide-react";

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 p-4 bg-white text-black rounded-full shadow-lg hover:bg-black hover:text-white transition"
      aria-label="Chatbot"
    >
      <MessageSquare size={24} />
    </button>
  );
};

export default ChatbotButton;
