import React from 'react';
import { Award, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-slate-100 tracking-tight">
                Certify<span className="text-indigo-400">Pro</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Modern Bulk Certificate Generator & High-DPI Design Studio
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Client-Side Engine</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy First</span>
          </div>
        </div>
      </div>
    </header>
  );
};
