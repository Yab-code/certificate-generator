import React, { useRef } from 'react';
import { CertificateTemplate } from '@/types/certificate';
import { BUILTIN_TEMPLATES } from '@/utils/templates';
import { LayoutGrid, Upload, Check, Image as ImageIcon } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: CertificateTemplate;
  onSelectTemplate: (template: CertificateTemplate) => void;
  customTemplateImage: string | null;
  onCustomTemplateUpload: (file: File) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
  customTemplateImage,
  onCustomTemplateUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onCustomTemplateUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-indigo-400" />
          Step 2: Certificate Template
        </label>
        <span className="text-xs text-slate-400 font-medium">
          {BUILTIN_TEMPLATES.length} Presets Available
        </span>
      </div>

      {/* Grid of built-in templates */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BUILTIN_TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate.id === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl)}
              className={`group relative rounded-xl border-2 overflow-hidden p-2.5 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              {/* Miniature Color Badge & Banner */}
              <div
                className="h-16 w-full rounded-lg mb-2 flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${tmpl.primaryColor}22 0%, ${tmpl.accentColor}44 100%)`,
                  borderColor: tmpl.primaryColor,
                  borderWidth: '1px',
                }}
              >
                {/* Decorative mini frame */}
                <div
                  className="absolute inset-1.5 border border-dashed rounded opacity-40"
                  style={{ borderColor: tmpl.primaryColor }}
                />
                
                {/* Mini Certificate Icon */}
                <div
                  className="w-10 h-6 rounded flex items-center justify-center shadow-sm text-[8px] font-bold tracking-widest text-slate-100"
                  style={{ backgroundColor: tmpl.primaryColor }}
                >
                  CERT
                </div>

                {isSelected && (
                  <div className="absolute top-1 right-1 p-1 bg-indigo-500 text-white rounded-full shadow-md">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="px-0.5">
                <p className="text-xs font-semibold text-slate-200 truncate">{tmpl.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{tmpl.category}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Template Uploader */}
      <div className="pt-1">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`w-full flex items-center justify-between p-3 rounded-xl border border-dashed transition-all ${
            selectedTemplate.id.startsWith('custom-')
              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
              : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-800/40 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0">
              {customTemplateImage ? <ImageIcon className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold">
                {customTemplateImage ? 'Custom Image Loaded' : 'Upload Custom Template Image'}
              </p>
              <p className="text-[11px] text-slate-400">PNG, JPG or JPEG (Recommended 1920x1080)</p>
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
            Browse
          </span>
        </button>
      </div>
    </div>
  );
};
