import React from 'react';
import { Users, Sparkles } from 'lucide-react';

interface ManualNameInputProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
}

const SAMPLE_NAMES = [
  'Alex Morgan',
  'Dr. Sarah Jenkins',
  'Marcus Vance',
  'Elena Rostova',
  'Jonathan Sterling',
].join('\n');

export const ManualNameInput: React.FC<ManualNameInputProps> = ({
  value,
  onChange,
  count,
}) => {
  const handleLoadSample = () => {
    onChange(SAMPLE_NAMES);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          Enter Recipient Names (one per line)
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 rounded-md transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            Fill Demo Names
          </button>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {count}
          </span>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`John Doe\nJane Smith\nRobert Johnson\nEmily Davis`}
          className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono leading-relaxed resize-y min-h-[120px]"
        />
      </div>
    </div>
  );
};
