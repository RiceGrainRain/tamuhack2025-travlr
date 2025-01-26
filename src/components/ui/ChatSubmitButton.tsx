import React, { useState } from 'react';

interface ChatSubmitButtonProps {
  userQuestion: string;
  setAiResponse: (response: string) => void;
  clearInput: () => void;
}

const ChatSubmitButton: React.FC<ChatSubmitButtonProps> = ({ userQuestion, setAiResponse, clearInput }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChatSubmit = async () => {
    setIsLoading(true);

    try {
      // Sanitize email from sessionStorage
      let storedEmail = sessionStorage.getItem('email') || '';
      storedEmail = storedEmail.replace(/^"|"$/g, '');

      // Fetch flight ID
      const flightResponse = await fetch(`http://localhost:5000/gets_flight/${storedEmail}`);
      if (!flightResponse.ok) {
        throw new Error('Failed to fetch flight ID');
      }
      const flightData = await flightResponse.json();
      const flightId = flightData.flight;

      // Fetch flight details
      const flightDetailsResponse = await fetch(`http://localhost:5000/flight/${flightId}`);
      if (!flightDetailsResponse.ok) {
        throw new Error('Failed to fetch flight details');
      }
      const flightDetails = await flightDetailsResponse.json();

      // Prepare flight info with current time
      const completeFlightInfo = {
        ...flightDetails,
        Current_Time: new Date().toISOString()
      };

      // Update flight info
      const updateResponse = await fetch('http://localhost:5000/update_flight_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeFlightInfo)
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update flight info');
      }

      // Send chat request
      const chatResponse = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuestion })
      });

      if (!chatResponse.ok) {
        throw new Error('Failed to get chat response');
      }

      const chatData = await chatResponse.json();
      setAiResponse(chatData.response);

    } catch (error) {
      console.error("Error during API calls:", error);
      setAiResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
      clearInput();
    }
  };

  return (
    <button onClick={handleChatSubmit} disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit Chat'}
    </button>
  );
};

export default ChatSubmitButton;