import React from 'react';
import { Recipient } from '@/types/certificate';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';

interface PreviewNavigatorProps {
  currentIndex: number;
  totalCount: number;
  recipients: Recipient[];
  onPrevious: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleFullscreen?: () => void;
}

export const PreviewNavigator: React.FC<PreviewNavigatorProps> = ({
  currentIndex,
  totalCount,
  recipients,
  onPrevious,
  onNext,
  onSelectIndex,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl shadow-lg">
      {/* Navigation Controls: Previous / Next & Index */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
          title="Previous Recipient"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Recipient Quick Selector */}
        <select
          value={currentIndex}
          onChange={(e) => onSelectIndex(Number(e.target.value))}
          className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 max-w-[180px] truncate"
        >
          {recipients.map((r, i) => (
            <option key={r.id || i} value={i}>
              {i + 1}. {r.name}
            </option>
          ))}
        </select>

        <span className="text-xs font-medium text-slate-400 font-mono">
          {totalCount > 0 ? `${currentIndex + 1} of ${totalCount}` : '0 of 0'}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex >= totalCount - 1}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-colors"
          title="Next Recipient"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom & Fullscreen Controls */}
      <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
        <button
          type="button"
          onClick={onZoomOut}
          disabled={zoomLevel <= 50}
          className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-semibold text-slate-300 px-1.5 min-w-[42px] text-center">
          {zoomLevel}%
        </span>

        <button
          type="button"
          onClick={onZoomIn}
          disabled={zoomLevel >= 200}
          className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onResetZoom}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors ml-1"
          title="Reset Zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border-l border-slate-800 pl-2"
            title="Fullscreen Modal Preview"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
