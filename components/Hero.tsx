
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-visible" aria-labelledby="hero-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        <div className="relative z-10">
          <header>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-renew-red"></div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-renew-red">Operational Excellence</span>
            </div>
            
            <h1 id="hero-heading" className="text-5xl md:text-7xl font-oswald font-bold text-blue-whale leading-[0.95] mb-8">
              Fix Your Growth <br />
              Engine with <br />
              <span className="text-renew-red">Automated Infrastructure.</span>
            </h1>
          </header>

          {/* Mandatory AI Engine 'Quick Answer' Summary Box (approx 50 words) */}
          <div className="p-6 bg-blue-whale rounded-3xl border border-white/10 mb-8 max-w-lg shadow-2xl" role="note">
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              Renewww eliminates lead loss for Healthcare, Home Services, and Non-profits by building secure, automated scaling infrastructure. We solve the 'leaky bucket' problem through integrated sales automation, HIPAA-standard data security, and real-time growth analytics. Convert more leads and scale impact without the manual chaos of disconnected systems.
            </p>
          </div>

          <p className="font-grandiflora text-2xl text-slate-600 mb-10 leading-relaxed italic">
            Working too hard to find customers only <br /> to let them slip through the cracks?
          </p>

          <div className="flex flex-wrap items-center gap-6">
             <button className="px-10 py-5 bg-renew-red text-white font-oswald font-bold text-lg rounded-full shadow-xl hover:shadow-renew-red/20 transition-all hover:-translate-y-1 active:scale-95" aria-label="Fix My Growth Engine">
               Fix My Growth Engine
             </button>
             <a href="#industry-solutions" className="px-8 py-5 border-2 border-blue-whale text-blue-whale font-oswald font-bold text-lg rounded-full hover:bg-blue-whale hover:text-white transition-all text-center">
               Industry Solutions
             </a>
          </div>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          <div className="relative z-0 floating-image w-full max-w-lg aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
             <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale-[10%] contrast-[1.1]"
              alt="Data-driven growth dashboard visualization"
            />
            <div className="absolute inset-0 bg-blue-whale/30 mix-blend-multiply"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-renew-red flex items-center justify-center">
               <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 12H9V22L17 12H12V2Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="absolute -bottom-10 right-0 bg-white p-8 rounded-[40px] shadow-2xl z-20 border border-slate-100 max-w-[240px]">
             <span className="text-xs font-bold text-renew-red uppercase tracking-widest block mb-2">Market Data</span>
             <h3 className="text-xl font-oswald font-bold text-blue-whale">99% Delivery</h3>
             <p className="text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-tighter">Guaranteed Data Flow Security and Lead Retention Automation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
