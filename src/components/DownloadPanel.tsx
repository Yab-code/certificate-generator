import React from 'react';
import { Download, FileImage, FileCode, Archive, Sparkles } from 'lucide-react';

interface DownloadPanelProps {
  onDownloadSingle: (format: 'png' | 'jpg' | 'pdf') => void;
  onDownloadBatchZip: () => void;
  recipientName: string;
  totalRecipients: number;
}

export const DownloadPanel: React.FC<DownloadPanelProps> = ({
  onDownloadSingle,
  onDownloadBatchZip,
  recipientName,
  totalRecipients,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-2">
          <Download className="w-4 h-4 text-indigo-400" />
          Export & Download Options
        </h3>
        <span className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
          Target: <span className="text-slate-200 font-semibold">{recipientName || 'Current Recipient'}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Download PNG */}
        <button
          type="button"
          onClick={() => onDownloadSingle('png')}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-slate-100 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          <FileImage className="w-4 h-4 text-emerald-400" />
          Download PNG
        </button>

        {/* Download JPG */}
        <button
          type="button"
          onClick={() => onDownloadSingle('jpg')}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-slate-100 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          <FileImage className="w-4 h-4 text-amber-400" />
          Download JPG
        </button>

        {/* Download PDF */}
        <button
          type="button"
          onClick={() => onDownloadSingle('pdf')}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-slate-100 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          <FileCode className="w-4 h-4 text-rose-400" />
          Download PDF
        </button>

        {/* Download All as ZIP */}
        <button
          type="button"
          onClick={onDownloadBatchZip}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-500/50 text-white font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20"
        >
          <Archive className="w-4 h-4 text-indigo-200" />
          <span>Download All ({totalRecipients}) as ZIP</span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
        </button>
      </div>
    </div>
  );
};
