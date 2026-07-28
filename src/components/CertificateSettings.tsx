import React from 'react';
import { CertificateTemplate, DesignSettings, Recipient } from '@/types/certificate';
import { NameUploader } from './NameUploader';
import { ManualNameInput } from './ManualNameInput';
import { TemplateSelector } from './TemplateSelector';
import { DesignControls } from './DesignControls';
import { Settings, Layers, DownloadCloud, Sparkles } from 'lucide-react';

interface CertificateSettingsProps {
  recipients: Recipient[];
  csvFilename?: string;
  onNamesLoadedFromCsv: (recipients: Recipient[], filename: string) => void;
  onClearCsv: () => void;
  manualText: string;
  onManualTextChange: (text: string) => void;
  selectedTemplate: CertificateTemplate;
  onSelectTemplate: (template: CertificateTemplate) => void;
  customTemplateImage: string | null;
  onCustomTemplateUpload: (file: File) => void;
  designSettings: DesignSettings;
  onDesignSettingsChange: (settings: Partial<DesignSettings>) => void;
  onResetDesign: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const CertificateSettings: React.FC<CertificateSettingsProps> = ({
  recipients,
  csvFilename,
  onNamesLoadedFromCsv,
  onClearCsv,
  manualText,
  onManualTextChange,
  selectedTemplate,
  onSelectTemplate,
  customTemplateImage,
  onCustomTemplateUpload,
  designSettings,
  onDesignSettingsChange,
  onResetDesign,
  onGenerate,
  isGenerating,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 tracking-tight">Certificate Settings</h2>
            <p className="text-xs text-slate-400">Configure recipients, template & design</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          {recipients.length} Recipient{recipients.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Scrollable Settings Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-6 custom-scrollbar">
        {/* STEP 1: Recipient Names */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
              1
            </span>
            Step 1: Recipient Names
          </label>

          {/* CSV Uploader */}
          <NameUploader
            onNamesLoaded={onNamesLoadedFromCsv}
            currentFilename={csvFilename}
            onClearFile={onClearCsv}
            count={recipients.length}
          />

          {/* Divider OR */}
          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-800 w-full" />
            <span className="absolute bg-slate-900 px-3 text-[11px] font-bold text-slate-400 tracking-widest uppercase">
              OR
            </span>
          </div>

          {/* Manual Textarea */}
          <ManualNameInput
            value={manualText}
            onChange={onManualTextChange}
            count={recipients.length}
          />
        </div>

        {/* STEP 2: Certificate Template */}
        <div className="pt-2 border-t border-slate-800/80">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
            customTemplateImage={customTemplateImage}
            onCustomTemplateUpload={onCustomTemplateUpload}
          />
        </div>

        {/* STEP 3: Design Customization */}
        <div className="pt-2 border-t border-slate-800/80">
          <DesignControls
            settings={designSettings}
            onChange={onDesignSettingsChange}
            onReset={onResetDesign}
          />
        </div>
      </div>

      {/* Full-width Primary Action Button */}
      <div className="pt-4 mt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || recipients.length === 0}
          className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3.5 px-4 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          <DownloadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Generate {recipients.length > 0 ? `${recipients.length} ` : ''}Certificates</span>
          <Sparkles className="w-4 h-4 text-indigo-200 opacity-80" />
        </button>
      </div>
    </div>
  );
};
