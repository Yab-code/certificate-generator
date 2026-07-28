import React, { useState } from 'react';
import { CertificateTemplate, DesignSettings, Recipient } from '@/types/certificate';
import { CertificateCanvas } from './CertificateCanvas';
import { PreviewNavigator } from './PreviewNavigator';
import { DownloadPanel } from './DownloadPanel';
import { Eye, Sparkles, X } from 'lucide-react';

interface LivePreviewProps {
  recipients: Recipient[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  selectedTemplate: CertificateTemplate;
  designSettings: DesignSettings;
  customTemplateImage: HTMLImageElement | null;
  onDownloadSingle: (format: 'png' | 'jpg' | 'pdf') => void;
  onDownloadBatchZip: () => void;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  recipients,
  currentIndex,
  onIndexChange,
  selectedTemplate,
  designSettings,
  customTemplateImage,
  onDownloadSingle,
  onDownloadBatchZip,
  onCanvasReady,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);

  const currentRecipient = recipients[currentIndex] || { name: 'Recipient Name' };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < recipients.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(200, prev + 15));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(50, prev - 15));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Preview Navigator Bar */}
      <PreviewNavigator
        currentIndex={currentIndex}
        totalCount={recipients.length}
        recipients={recipients}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSelectIndex={onIndexChange}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onToggleFullscreen={() => setIsFullscreenModalOpen(true)}
      />

      {/* Main Preview Card Container */}
      <div className="flex-1 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden min-h-[420px]">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none blur-3xl transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at center, ${selectedTemplate.accentColor || '#6366f1'}, transparent 70%)`,
          }}
        />

        {/* Live Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
          <Eye className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Live Certificate Preview</span>
        </div>

        {/* Template Badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{selectedTemplate.name}</span>
        </div>

        {/* Zoomable Canvas Wrapper */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <CertificateCanvas
            recipientName={currentRecipient.name}
            template={selectedTemplate}
            settings={designSettings}
            customImage={customTemplateImage}
            onCanvasReady={onCanvasReady}
          />
        </div>
      </div>

      {/* Download Section below preview */}
      <DownloadPanel
        onDownloadSingle={onDownloadSingle}
        onDownloadBatchZip={onDownloadBatchZip}
        recipientName={currentRecipient.name}
        totalRecipients={recipients.length}
      />

      {/* Fullscreen Preview Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              Full Resolution Preview - {currentRecipient.name}
            </h3>
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
            <div className="max-w-5xl w-full">
              <CertificateCanvas
                recipientName={currentRecipient.name}
                template={selectedTemplate}
                settings={designSettings}
                customImage={customTemplateImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
