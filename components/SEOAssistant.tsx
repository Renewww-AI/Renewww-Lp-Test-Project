
import React, { useState, useMemo } from 'react';
import { getSEOAdvice, SEOAdviceResponse } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const SEOAssistant: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [niche, setNiche] = useState('Healthcare');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOAdviceResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    setLoading(true);
    const advice = await getSEOAdvice(businessName, niche);
    setResult(advice);
    setLoading(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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

              {result.warning && (
                <div className="p-4 bg-renew-red/5 border border-renew-red/10 rounded-2xl flex items-start gap-3">
                  <div className="text-renew-red text-xl">⚠️</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                    <span className="text-renew-red font-bold uppercase text-[9px] block mb-1">Scale Risk Warning:</span>
                    {result.warning}
                  </p>
                </div>
              )}
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
                                <div className="bg-white p-3 shadow-xl border border-slate-100 rounded-xl max-w-xs">
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

              <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Competitive Edge Recommendation</span>
                <p className="text-sm font-bold text-blue-whale flex gap-2">
                  <span className="text-renew-red font-black">»</span>
                  {result.competitiveEdge}
                </p>
              </div>

              <button className="w-full py-5 bg-blue-whale text-white font-oswald font-bold rounded-full hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl">
                Execute Visual Growth Plan
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAssistant;
