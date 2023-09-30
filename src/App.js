import React, { useState } from 'react';
import './App.css';

function App() {
  const [userMessage, setUserMessage] = useState('');
  const [chatbotMessage, setChatbotMessage] = useState('');
  
  console.log('ENV:', process.env)

  const backendUrl = process.env.REACT_APP_BACKEND_URL
  
  const sendMessage = async (event) => {
    console.log('HOLA')
    try {
      console.log('backendUrl:', backendUrl);
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "Something went wrong");
      }

      setChatbotMessage(data.chatbot_response);
    }
    catch (error) {
      console.error(error);
      setChatbotMessage("Sorry!, something went wrong")
    }
  }

  return (
    <div>
      <input
        type="text"
        value={userMessage}
        onChange={(event) => setUserMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>{chatbotMessage}</p>
    </div>
  );
}

export default App;