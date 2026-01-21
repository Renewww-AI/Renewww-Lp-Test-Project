
import React from 'react';

const FooterBar: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="bg-blue-whale/95 backdrop-blur-md rounded-[2.5rem] py-4 px-8 flex items-center justify-between shadow-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
             {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i+40}/50/50`} className="w-8 h-8 rounded-full border-2 border-blue-whale object-cover" alt="" />
             ))}
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-black text-white">5k+</span>
            <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-[0.2em]">Growing Brands</span>
          </div>
        </div>

        <button className="bg-renew-red text-white px-8 py-3 rounded-full font-oswald font-bold text-sm flex items-center gap-3 hover:bg-red-700 transition-all active:scale-95 shadow-lg group">
          Fix My Growth Engine
          <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 7l-10 10M17 7H7M17 7v10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
};

export default FooterBar;
