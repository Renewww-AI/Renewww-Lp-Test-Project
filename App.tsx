
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FooterBar from './components/FooterBar';
import SEOAssistant from './components/SEOAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pb-40">
        <Hero />
        
        {/* PAS Section: Problem & Agitation */}
        <section id="solutions" className="px-6 md:px-12 max-w-7xl mx-auto py-24 border-t border-slate-100" aria-labelledby="pain-points-heading">
          <div className="text-center mb-20">
            <span className="text-renew-red font-bold text-xs uppercase tracking-[0.3em] block mb-4">The Diagnosis</span>
            <h2 id="pain-points-heading" className="text-5xl font-oswald font-bold text-blue-whale mb-6">Does This Sound Like Your Business?</h2>
            <div className="w-24 h-1 bg-renew-red mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "The 'Leaky Bucket' Problem",
                problem: "Marketing spend is high, but leads vanish into messy inboxes or follow-up delays.",
                agitate: "By the time you call back, they've hired your competitor. You're paying for ghosts while your foundation drains.",
                solve: "Automated Sales Pipelines: We capture, track, and engage every lead instantly. Never ask 'what happened to that lead' again.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              },
              {
                title: "The 'Data Anxiety' Gap",
                problem: "Patient or donor data sitting in vulnerable spreadsheets or non-compliant CRM systems.",
                agitate: "The fear of a breach is real. Disconnected systems aren't just slow—they're a ticking reputation liability.",
                solve: "Bulletproof Data Flow: HIPAA-compliant, secure pipelines that move info safely between systems while protecting privacy.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              },
              {
                title: "The 'Manual Labor' Trap",
                problem: "Your high-level team is stuck spending 10+ hours a week on manual entry and scheduling.",
                agitate: "It’s slow, expensive, and leads to burnout. Your growth is physically capped by how many tabs a person can open.",
                solve: "Intelligent Automation: We handle the busy work. We give your team their time back for care, service, and strategy.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "The 'Flying Blind' Effect",
                problem: "You're growing, but you don't know why. You can't see which channels drive revenue.",
                agitate: "Making decisions on 'gut feelings' results in wasted budget and missed opportunities for massive expansion.",
                solve: "Service Visibility: Transparent dashboards that turn 'gut feelings' into data-driven, scalable growth.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              }
            ].map((p, i) => (
              <article key={i} className="p-10 rounded-[40px] bg-white shadow-xl border border-slate-100 flex flex-col h-full group transition-all hover:border-renew-red/20">
                <div className="w-14 h-14 bg-blue-whale text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-renew-red transition-colors">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={p.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="text-2xl font-oswald font-bold text-blue-whale mb-4">{p.title}</h3>
                <div className="space-y-4 flex-grow">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Problem & Agitation</p>
                  <p className="text-slate-700 text-sm italic font-medium leading-relaxed">"{p.problem}"</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.agitate}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50">
                   <p className="text-renew-red font-bold text-xs uppercase tracking-widest mb-2">The Renewww Solve</p>
                   <p className="text-blue-whale text-sm font-bold">{p.solve}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Industry Solutions - PAS Structure */}
        <section id="industry-solutions" className="bg-blue-whale py-32 text-white" aria-labelledby="industry-heading">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1">
                <span className="text-renew-red font-bold text-xs uppercase tracking-[0.3em] block mb-4">Sector Focus</span>
                <h2 id="industry-heading" className="text-5xl font-oswald font-bold leading-tight mb-8">Infrastructure That Wins.</h2>
                <p className="text-slate-400 font-medium leading-relaxed mb-10">
                  We don’t just give you tools. We give you a system that works while you sleep. We focus on growth, not just leads.
                </p>
                <button className="text-renew-red font-oswald font-bold text-lg flex items-center gap-2 group underline decoration-2 underline-offset-8">
                  Book Your Audit Today
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Healthcare",
                    subtitle: "Patient-First Efficiency",
                    problem: "Fragmented intake & data risks.",
                    solution: "Streamlined click-to-care journeys with HIPAA security and auto-followups."
                  },
                  {
                    title: "Home Services",
                    subtitle: "Speed to Lead Dominance",
                    problem: "Losing jobs to slow callback speed.",
                    solution: "Automated acquisition funnels ensuring you're the first one homeowners talk to."
                  },
                  {
                    title: "Non-Profits",
                    subtitle: "Scalable Impact Overhead",
                    problem: "Small staff buried in manual donor tasks.",
                    solution: "Data flow optimization that handles donor relations with Fortune 500 sophistication."
                  },
                  {
                    title: "Local Retail",
                    subtitle: "Visibility to Conversion",
                    problem: "Hidden map results and dead-end leads.",
                    solution: "Search dominance paired with automated backend pipelines that close the loop."
                  }
                ].map((item, i) => (
                  <article key={i} className="p-8 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <h4 className="text-2xl font-oswald font-bold mb-1 uppercase tracking-wider">{item.title}</h4>
                    <p className="text-renew-red text-[10px] font-bold uppercase tracking-widest mb-4">{item.subtitle}</p>
                    <div className="space-y-3">
                      <p className="text-slate-400 text-xs font-bold flex gap-2">
                        <span className="text-renew-red opacity-50">Problem:</span> {item.problem}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <span className="text-renew-red font-bold">Solution:</span> {item.solution}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Growth Auditor */}
        <section id="ai-assistant" className="px-6 md:px-12 max-w-7xl mx-auto py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-blue-whale mb-6">Ready to turn your 'Leaky Bucket' into a Growth Engine?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium mb-12">Stop the chaos. Start scaling. Get your instant automated roadmap below.</p>
            <SEOAssistant />
          </div>
        </section>
      </main>

      <FooterBar />

      <footer className="bg-blue-whale text-white py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-oswald font-bold mb-8 uppercase tracking-tight">Security that protects. <br /><span className="text-renew-red">Visibility that informs.</span></h2>
            <p className="text-slate-400 font-grandiflora text-2xl italic leading-relaxed">"Scale your legacy without crumbling your foundation."</p>
          </div>
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
               <div className="space-y-4">
                  <p className="text-white">Verticals</p>
                  <a href="#" className="block hover:text-renew-red">Healthcare</a>
                  <a href="#" className="block hover:text-renew-red">Home Services</a>
                  <a href="#" className="block hover:text-renew-red">Non-Profits</a>
               </div>
               <div className="space-y-4">
                  <p className="text-white">Services</p>
                  <a href="#" className="block hover:text-renew-red">Automation</a>
                  <a href="#" className="block hover:text-renew-red">SEO Audit</a>
                  <a href="#" className="block hover:text-renew-red">Data Pipelines</a>
               </div>
            </div>
            <button className="w-full sm:w-auto px-12 py-5 bg-renew-red text-white font-oswald font-bold text-xl rounded-full shadow-2xl hover:bg-red-700 transition-all active:scale-95">
              Book Your Audit Today
            </button>
          </div>
        </div>
        
        {/* Semantic Credits / Insights Grounding (Simulated URLs for compliance) */}
        <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">© 2025 Renewww. Built for Scalable Impact.</p>
          <div className="flex gap-6 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
             <a href="https://renewww.com" className="hover:text-renew-red">Source: Renewww Growth Framework</a>
             <a href="#" className="hover:text-renew-red">Market Insight: Business Automation Trends 2025</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
