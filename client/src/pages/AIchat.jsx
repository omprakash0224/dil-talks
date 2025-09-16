import React, { useState, useEffect, useRef } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import apiClient, { setAuthToken } from '../services/api';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const AIchat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hey ${user?.firstName || 'friend'}! Dil-Dost here, your go-to AI buddy. What's on your mind today? Spill the tea! 🍵` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const { getToken } = useAuth();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const token = await getToken();
      setAuthToken(token); // Set the token here before making the request

      const response = await apiClient.post('/api/chat', {
        history: messages.slice(-6),
        message: input,
      });

      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Failed to get response from AI", error);
      const errorMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">AI Chit-Chat</h1>
        <p className="text-sm text-gray-500">Your friendly AI assistant</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-lg p-3 rounded-2xl ${msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
            <div className="max-w-lg p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm">
              <div className="flex items-center justify-center space-x-1">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
            disabled={isLoading}
          >
            <FaPaperPlane />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default AIchat;
