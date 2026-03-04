
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, Minus } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are the GRIDS AI Assistant, a helpful expert on the Gender-Responsive Integrated Database System (GRIDS) for Baguio City. Your role is to help users navigate the database, understand GAD (Gender and Development) indicators, legal policies (like CEDAW and the Magna Carta of Women), and statistics from the CBMS (Community-Based Monitoring System). You should be professional, knowledgeable about Baguio City's initiatives, and encouraging toward gender equality and inclusive governance. Keep responses concise and focused on city data and gender mainstreaming.",
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error connecting to the system. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[60] w-14 h-14 md:w-16 md:h-16 bg-purple-600 text-white rounded-full shadow-[0_20px_50px_rgba(139,68,175,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group border-4 border-white dark:border-[#1A1625]"
      >
        <MessageSquare className="group-hover:rotate-12 transition-transform" size={28} strokeWidth={2.5} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  const cardBg = isDarkMode ? 'bg-[#1A1625] border-white/10 shadow-purple-950/40' : 'bg-white border-purple-50 shadow-purple-900/10';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] w-[calc(100%-3rem)] sm:w-[400px] flex flex-col transition-all duration-500 animate-in slide-in-from-bottom-8 ${isMinimized ? 'h-20' : 'h-[600px] max-h-[80vh]'}`}>
      <div className={`flex-1 flex flex-col rounded-[40px] border shadow-2xl overflow-hidden ${cardBg}`}>
        {/* Header */}
        <div className="p-6 bg-purple-600 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Bot size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight leading-none text-sm">GRIDS Assistant</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Powered</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <Minus size={20} />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-transparent">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-10">
                  <Sparkles size={48} className="text-purple-600 mb-4" />
                  <h4 className={`text-lg font-black uppercase tracking-tighter ${textPrimary}`}>How can I help?</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2 max-w-[200px]">Ask me about GAD indicators, Baguio policies, or CBMS data.</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm
                      ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-purple-600'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-[24px] text-sm leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : (isDarkMode ? 'bg-white/5 text-gray-200 border border-white/5' : 'bg-gray-50 text-gray-800 border border-gray-100') + ' rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-purple-600 flex items-center justify-center shrink-0">
                      <Loader2 className="animate-spin" size={16} />
                    </div>
                    <div className={`p-4 rounded-[24px] rounded-tl-none text-sm font-bold uppercase tracking-widest text-purple-600/50 
                      ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      Synthesizing...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-6 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-3 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className={`flex-1 pl-6 pr-14 py-4 rounded-[28px] text-xs font-bold focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all
                    ${isDarkMode ? 'bg-[#2A2438] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-all disabled:opacity-30 disabled:hover:bg-black"
                >
                  <Send size={16} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
