import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { config } from '../config/env'

const ChatWindow = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket
    ws.current = new WebSocket(config.backendUrl); // Assuming WebSocket runs on the same port as HTTP

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = `${user?.name || 'Anonymous'}: ${input}`;
      ws.current.send(message);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasons Chat</h2>
      <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm text-gray-800">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
