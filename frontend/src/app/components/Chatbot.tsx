'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, X, Minimize2, Maximize2, Send, MessageCircle } from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimizeToggle: () => void;
  isMinimized: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, onMinimizeToggle, isMinimized }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your virtual admissions assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    'What are the admission requirements?',
    'What is the fee structure?',
    'When is the next admission cycle?',
    'How do I apply online?',
    'What documents do I need?',
    'Can I schedule a campus visit?',
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulated chatbot response - this would connect to your LLM API
  const getBotResponse = async (userMessage: string) => {
    setIsTyping(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple response logic - replace with actual LLM integration
    let response = '';
    const message = userMessage.toLowerCase();

    if (message.includes('fee') || message.includes('cost')) {
      response =
        "Our fee structure varies by grade level. For Pre-School, the monthly fee is PKR 8,000. For Grade 9-10, it's PKR 22,000. Would you like detailed information about fees for a specific grade?";
    } else if (message.includes('admission') || message.includes('apply')) {
      response =
        'To apply for admission, you need to complete our 5-step process: Application Form, Document Submission, Assessment Test, Interview, and final Admission Decision. The process typically takes 7-10 working days. Would you like me to guide you through any specific step?';
    } else if (message.includes('document') || message.includes('requirement')) {
      response =
        'Required documents include: Birth Certificate, Previous School Leaving Certificate, Academic Transcripts, Parent CNIC, Recent Photographs, Medical Certificate, and Character Certificate (if applicable). All documents should have original + photocopy.';
    } else if (message.includes('visit') || message.includes('tour')) {
      response =
        'We\'d love to show you our campus! You can schedule a visit by calling +92 (51) 123-4567 or WhatsApp us at +92 300 123-4567. Campus tours are available Monday to Friday, 9 AM to 3 PM.';
    } else if (message.includes('when') || message.includes('deadline')) {
      response =
        'Our next admission cycle opens in February 2025 for the academic year 2025-26. Early applications are encouraged as we have limited seats. The deadline for applications is usually end of March.';
    } else {
      response =
        'Thank you for your question! For specific inquiries, I recommend speaking with our admissions team directly at +92 (51) 123-4567 or visiting our campus. Is there anything specific about our admission process I can help clarify?';
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    const botResponse = await getBotResponse(inputMessage);
    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
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
              <h3 className="font-semibold">Admissions Assistant</h3>
              <p className="text-sm text-blue-100">Online now</p>
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
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) => (
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
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;