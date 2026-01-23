import React, { useState, useMemo, useRef, useEffect } from 'react';
import { getSEOAdvice, SEOAdviceResponse, startGrowthChat } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SEOAssistant: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [niche, setNiche] = useState('Healthcare');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOAdviceResponse | null>(null);
  
  // Chat States
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    setLoading(true);
    const advice = await getSEOAdvice(businessName, niche);
    setResult(advice);
    setLoading(false);
    
    if (advice) {
      // Initialize chat session with the audit as context
      chatSession.current = startGrowthChat(businessName, JSON.stringify(advice));
      setMessages([{ role: 'model', text: `Audit complete for ${businessName}. I've analyzed your ${niche} infrastructure. Do you have any questions about the roadmap or the competency scores?` }]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chatSession.current || isTyping) return;

    const userMessage = userInput.trim();
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const stream = await chatSession.current.sendMessageStream({ message: userMessage });
      let fullResponse = '';
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const chunkText = (chunk as GenerateContentResponse).text || '';
        fullResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      { subject: 'Automation', A: result.scores.automation, fullMark: 100 },
      { subject: 'Security', A: result.scores.security, fullMark: 100 },
      { subject: 'Visibility', A: result.scores.visibility, fullMark: 100 },
      { subject: 'Conversion', A: result.scores.conversion, fullMark: 100 },
    ];
  }, [result]);

  const barData = useMemo(() => {
    if (!result) return [];
    return result.roadmap.map((step, index) => ({
      name: `Phase ${index + 1}`,
      value: 100 - (index * (100 / result.roadmap.length)), // Visual phase priority
      step: step
    }));
  }, [result]);

  return (
    <div id="ai-growth-auditor" className="mt-12 glass-card rounded-[40px] p-8 md:p-12 max-w-5xl mx-auto shadow-2xl border border-blue-whale/10 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-oswald font-bold text-blue-whale mb-2 flex items-center gap-3">
            <span className="text-renew-red">⚡</span> AI Growth Auditor
          </h2>
          <p className="text-slate-600 text-sm max-w-md">Our Gemini engine provides a graphical gap analysis and a prioritized automation roadmap for your specific market.</p>
        </div>
        <div className="px-4 py-2 bg-blue-whale text-white rounded-full">
          <span className="text-[10px] font-bold uppercase tracking-widest">Analytics Mode Enabled</span>
        </div>
      </div>
      
      <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col gap-1 md:col-span-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Organization</label>
          <input 
            type="text" 
            placeholder="Business Name..." 
            className="px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-renew-red bg-white font-medium text-blue-whale"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 md:col-span-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Industry Vertical</label>
          <select 
            className="px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-renew-red bg-white font-medium appearance-none cursor-pointer text-blue-whale"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          >
            <option>Healthcare</option>
            <option>Home Services</option>
            <option>Non-Profits</option>
            <option>Legal</option>
            <option>Real Estate</option>
          </select>
        </div>
        <div className="flex flex-col justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-renew-red text-white font-oswald font-bold rounded-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Generate Visual Audit'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            {/* Visual Analytics Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm h-[350px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-4">Competency Gap Analysis</span>
                <ResponsiveContainer width="100%" height="90%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#003049', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                      name="Current Status"
                      dataKey="A"
                      stroke="#d62828"
                      fill="#d62828"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-6 bg-blue-whale text-white rounded-3xl shadow-xl">
                <span className="text-renew-red font-bold text-[10px] uppercase tracking-widest block mb-2">The Diagnosis</span>
                <p className="text-sm leading-relaxed font-grandiflora italic text-lg">"{result.summary}"</p>
              </div>
            </div>

            {/* Strategic Roadmap Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-4">Implementation Priority</span>
                <div className="h-[150px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical">
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" hide />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 shadow-xl border border-slate-100 rounded-xl max-w-xs z-50">
                                  <p className="text-[10px] font-bold text-renew-red mb-1">{payload[0].payload.name}</p>
                                  <p className="text-xs text-blue-whale font-medium">{payload[0].payload.step}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#d62828' : '#003049'} fillOpacity={1 - (index * 0.2)} />
                          ))}
                        </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Step-by-Step Strategic Actions</span>
                {result.roadmap.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-blue-whale flex items-center justify-center font-oswald font-bold text-sm group-hover:bg-renew-red group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed pt-1 font-medium">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setChatActive(!chatActive)}
                  className={`flex-1 py-5 rounded-full font-oswald font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-2xl ${chatActive ? 'bg-renew-red text-white' : 'bg-blue-whale text-white hover:bg-slate-800'}`}
                >
                  {chatActive ? 'Close Specialist Chat' : 'Chat with Specialist'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Follow-up Chat Interface */}
          {chatActive && (
            <div className="border-t border-slate-100 pt-12 animate-in fade-in zoom-in duration-500">
              <div className="max-w-3xl mx-auto bg-slate-50/50 rounded-[40px] border border-slate-200 overflow-hidden flex flex-col h-[500px]">
                <div className="p-6 bg-blue-whale text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-oswald font-bold text-lg tracking-wider">Growth Specialist (AI)</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Connected to Renewww Core</span>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-6 py-4 rounded-[2rem] text-sm shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-renew-red text-white rounded-tr-none' 
                          : 'bg-white text-blue-whale border border-slate-100 rounded-tl-none'
                      }`}>
                        {msg.text || (isTyping && i === messages.length - 1 ? "Thinking..." : "")}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Ask about your security gap or roadmap..." 
                    className="flex-grow px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-whale text-sm font-medium"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={isTyping || !userInput.trim()}
                    className="bg-blue-whale text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SEOAssistant;