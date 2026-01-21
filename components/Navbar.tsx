
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="relative">
          <svg className="w-10 h-10 text-renew-red" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 12H9V22L17 12H12V2Z" fill="currentColor" />
          </svg>
        </div>
        <div className="flex flex-col -gap-1">
          <span className="text-3xl font-oswald font-bold tracking-tight text-blue-whale leading-none">Renewww</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-1">Automated Infrastructure</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-blue-whale/70">
        <a href="#solutions" className="hover:text-renew-red transition-colors">The Problem</a>
        <a href="#industry" className="hover:text-renew-red transition-colors">Solutions</a>
        <a href="#ai-assistant" className="hover:text-renew-red transition-colors">Free Audit</a>
        <a href="#" className="hover:text-renew-red transition-colors">The Engine</a>
      </div>

      <button className="flex items-center gap-2 px-8 py-3 bg-blue-whale text-white rounded-full font-oswald text-sm font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-95">
        Fix My Growth
      </button>
    </nav>
  );
};

export default Navbar;
