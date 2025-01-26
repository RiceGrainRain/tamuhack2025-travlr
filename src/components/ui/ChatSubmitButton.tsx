import React, { useState } from 'react';

// Define the types for the props
interface ChatSubmitButtonProps {
  userQuestion: string;
  setAiResponse: (response: string) => void;
  clearInput: () => void; // Accept clearInput function as a prop
}

const ChatSubmitButton: React.FC<ChatSubmitButtonProps> = ({ userQuestion, setAiResponse, clearInput }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flightId, setFlightId] = useState('');
  const [flightData, setFlightData] = useState<any>(null);

  const handleChatSubmit = async () => {
    setIsLoading(true);  // Show loading state

    let storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      if (storedEmail.startsWith('"') && storedEmail.endsWith('"')) {
        storedEmail = storedEmail.slice(1, -1);
      }
    }
    console.log(storedEmail);

    try {
      console.log("response2");

      const response2 = await fetch(`http://localhost:5000/gets_flight/${storedEmail}`, {method: 'GET'});
      console.log("yo");
      if (response2.ok) {
        const data = await response2.json();
        setFlightId(data.flight);
      }

      console.log("response1");

      const response1 = await fetch(`http://localhost:5000/flight/${flightId}`, {method: 'GET'});
      if (response1.ok) {
        const data = await response1.json();
        const currentTime = new Date().toISOString();
        const flightWithTime = {
          ...data,  // Spread the original flight data
          currentTime: currentTime,  // Add current time to the data
        };
        setFlightData(flightWithTime);  // Set the flight data to state
      } else {
        setFlightData(null);
      }

      console.log(flightData);

      // Ensure flight info is updated
      await fetch('http://localhost:5000/update_flight_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(flightData),
      });

      console.log("chat");

      // Send chat request
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ message: userQuestion }),
      });

      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error("Error during API calls:", error);
    } finally {
      setIsLoading(false);  // Reset loading state
      clearInput(); // Clear the input after submission
    }
  };

  return (
    <button onClick={handleChatSubmit} disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit Chat'}
    </button>
  );
};

export default ChatSubmitButton;
