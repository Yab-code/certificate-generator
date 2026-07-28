import React from 'react';
import { DesignSettings } from '@/types/certificate';
import { FONT_OPTIONS, FONT_WEIGHTS } from '@/utils/googleFonts';
import {
  Sliders,
  RotateCcw,
  Type,
  Maximize2,
  MoveVertical,
  MoveHorizontal,
  Palette,
  Sparkles,
  AlignRight,
  ShieldAlert,
} from 'lucide-react';

interface DesignControlsProps {
  settings: DesignSettings;
  onChange: (updatedSettings: Partial<DesignSettings>) => void;
  onReset: () => void;
}

const PRESET_COLORS = [
  '#1e293b', // Slate Dark
  '#0f172a', // Midnight
  '#b45309', // Royal Amber
  '#d97706', // Gold
  '#1e3a8a', // Corporate Blue
  '#881337', // Academic Burgundy
  '#064e3b', // Emerald Green
  '#ffffff', // White
];

export const DesignControls: React.FC<DesignControlsProps> = ({
  settings,
  onChange,
  onReset,
}) => {
  return (
    <div className="space-y-5">
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          Step 3: Design Customization
        </label>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Design
        </button>
      </div>

      {/* Position Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
        {/* Vertical Position */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <MoveVertical className="w-3.5 h-3.5 text-indigo-400" /> Vertical Position
            </span>
            <span className="font-mono text-slate-400">{settings.verticalPosition}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.verticalPosition}
            onChange={(e) => onChange({ verticalPosition: Number(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Horizontal Position */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Horizontal Position
            </span>
            <span className="font-mono text-slate-400">{settings.horizontalPosition}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.horizontalPosition}
            onChange={(e) => onChange({ horizontalPosition: Number(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Typography Controls */}
      <div className="space-y-3 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Font Family */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-indigo-400" /> Font Family
            </label>
            <select
              value={settings.fontFamily}
              onChange={(e) => onChange({ fontFamily: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
          </div>

          {/* Font Weight */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Font Weight</label>
            <select
              value={settings.fontWeight}
              onChange={(e) => onChange({ fontWeight: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {FONT_WEIGHTS.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Font Size</span>
            <span className="font-mono text-slate-400">{settings.fontSize}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Color Picker & Presets */}
      <div className="space-y-2 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-indigo-400" /> Text Color
        </label>
        <div className="flex items-center gap-2">
          {/* Native Color Picker Box */}
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-700 shrink-0 cursor-pointer">
            <input
              type="color"
              value={settings.fontColor}
              onChange={(e) => onChange({ fontColor: e.target.value })}
              className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer border-none bg-transparent"
            />
          </div>
          {/* Color Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ fontColor: c })}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  settings.fontColor.toLowerCase() === c.toLowerCase()
                    ? 'scale-110 border-indigo-400 ring-2 ring-indigo-500/30'
                    : 'border-slate-700 hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-slate-400 ml-auto uppercase">{settings.fontColor}</span>
        </div>
      </div>

      {/* Advanced Text Sliders: Spacing, Line Height, Width */}
      <div className="space-y-3 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
        {/* Letter Spacing Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Letter Spacing</span>
            <span className="font-mono text-slate-400">{settings.letterSpacing}px</span>
          </div>
          <input
            type="range"
            min="-5"
            max="20"
            value={settings.letterSpacing}
            onChange={(e) => onChange({ letterSpacing: Number(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Line Height Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>Line Height</span>
            <span className="font-mono text-slate-400">{settings.lineHeight}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="2.5"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Maximum Text Width Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-indigo-400" /> Max Text Width
            </span>
            <span className="font-mono text-slate-400">{settings.maxTextWidth}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={settings.maxTextWidth}
            onChange={(e) => onChange({ maxTextWidth: Number(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Toggles: RTL, Text Shadow, Auto-Fit */}
      <div className="grid grid-cols-1 gap-2.5">
        {/* RTL Toggle */}
        <label className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-800 cursor-pointer hover:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-2">
            <AlignRight className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-200">Right-to-Left (RTL) Text</span>
          </div>
          <input
            type="checkbox"
            checked={settings.isRtl}
            onChange={(e) => onChange({ isRtl: e.target.checked })}
            className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
          />
        </label>

        {/* Text Shadow Toggle */}
        <label className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-800 cursor-pointer hover:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-200">Text Shadow</span>
          </div>
          <input
            type="checkbox"
            checked={settings.hasShadow}
            onChange={(e) => onChange({ hasShadow: e.target.checked })}
            className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
          />
        </label>

        {/* Auto-fit Long Names Toggle */}
        <label className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-800 cursor-pointer hover:bg-slate-900/60 transition-colors">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-200">Auto-fit Long Names</span>
          </div>
          <input
            type="checkbox"
            checked={settings.autoFitLongNames}
            onChange={(e) => onChange({ autoFitLongNames: e.target.checked })}
            className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
