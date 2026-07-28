import React from 'react';
import { BatchProgress } from '@/types/certificate';
import { Loader2, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface ProgressDialogProps {
  progress: BatchProgress;
  onCancel: () => void;
  onClose: () => void;
}

export const ProgressDialog: React.FC<ProgressDialogProps> = ({
  progress,
  onCancel,
  onClose,
}) => {
  if (progress.status === 'idle') return null;

  const percentage =
    progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        {/* Status Header */}
        <div className="flex items-center gap-3">
          {progress.status === 'processing' && (
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {progress.status === 'completed' && (
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}
          {(progress.status === 'cancelled' || progress.status === 'error') && (
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20">
              <AlertCircle className="w-6 h-6" />
            </div>
          )}

          <div>
            <h3 className="text-base font-bold text-slate-100">
              {progress.status === 'processing' && 'Generating Certificates...'}
              {progress.status === 'completed' && 'Generation Complete! 🎉'}
              {progress.status === 'cancelled' && 'Generation Cancelled'}
              {progress.status === 'error' && 'Generation Failed'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {progress.status === 'processing' && `Processing ${progress.current} of ${progress.total}`}
              {progress.status === 'completed' && `Successfully packaged ${progress.total} certificate(s) into ZIP.`}
              {progress.status === 'cancelled' && 'The batch export was stopped by user.'}
              {progress.status === 'error' && (progress.errorMessage || 'An error occurred during generation.')}
            </p>
          </div>
        </div>

        {/* Live Progress Bar */}
        {progress.status === 'processing' && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span className="truncate max-w-[240px]">
                Active: <span className="text-indigo-400">{progress.currentName || 'Preparing...'}</span>
              </span>
              <span className="font-mono text-indigo-400">{percentage}%</span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-150 shadow-md"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Completion details */}
        {progress.status === 'completed' && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-xs text-emerald-300 font-medium">
            Your ZIP archive has been created and downloading automatically to your device!
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          {progress.status === 'processing' ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              Cancel Generation
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
