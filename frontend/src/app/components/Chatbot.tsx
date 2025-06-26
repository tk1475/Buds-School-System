'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, X, Minimize2, Maximize2, Send, MessageCircle, Info, BookOpen } from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimizeToggle: () => void;
  isMinimized: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sources?: any[];
  confidence?: number;
}

interface RAGResponse {
  answer: string;
  sources: any[];
  confidence: number;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onMinimizeToggle, isMinimized }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your virtual admissions assistant powered by AI. I can help you with information about admissions, fees, documents, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSources, setShowSources] = useState<number | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    'What are the admission requirements?',
    'What is the fee structure?',
    'When is the next admission cycle?',
    'How do I apply online?',
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load suggested questions from API
    fetchSuggestedQuestions();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSuggestedQuestions = async () => {
    try {
      const response = await fetch('/api/chat');
      const data = await response.json();
      if (data.suggestedQuestions) {
        setSuggestedQuestions(data.suggestedQuestions);
      }
    } catch (error) {
      console.error('Error fetching suggested questions:', error);
    }
  };

  // RAG-powered chatbot response using API
  const getBotResponse = async (userMessage: string): Promise<RAGResponse> => {
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // Add a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return data;
    } catch (error) {
      console.error('Error getting bot response:', error);
      return {
        answer: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our admissions team directly at +92 (51) 123-4567.",
        sources: [],
        confidence: 0,
      };
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    const ragResponse = await getBotResponse(inputMessage);
    
    const botMessage: Message = {
      id: messages.length + 2,
      text: ragResponse.answer,
      sender: 'bot',
      timestamp: new Date(),
      sources: ragResponse.sources,
      confidence: ragResponse.confidence,
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const toggleSources = (messageId: number) => {
    setShowSources(showSources === messageId ? null : messageId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI Admissions Assistant</h3>
              <p className="text-sm text-blue-100">Powered by RAG</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMinimizeToggle}
              className="text-white/80 hover:text-white p-1 rounded"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      
                      {/* Show confidence and sources for bot messages */}
                      {message.sender === 'bot' && message.confidence !== undefined && (
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="text-xs text-gray-500">
                              Confidence: {Math.round(message.confidence * 100)}%
                            </div>
                          </div>
                          {message.sources && message.sources.length > 0 && (
                            <button
                              onClick={() => toggleSources(message.id)}
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <BookOpen className="w-3 h-3" />
                              Sources
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Sources dropdown */}
                  {message.sender === 'bot' && 
                   message.sources && 
                   message.sources.length > 0 && 
                   showSources === message.id && (
                    <div className="mt-2 ml-4 bg-blue-50 rounded-lg p-3">
                      <div className="text-xs font-semibold text-blue-800 mb-2">Sources:</div>
                      {message.sources.map((source, index) => (
                        <div key={index} className="text-xs text-blue-700 mb-1">
                          <span className="font-medium">{source.category}:</span> {source.content}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 4).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about admissions, fees, documents..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* AI Info */}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <Info className="w-3 h-3" />
                <span>Powered by AI with school-specific knowledge</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;