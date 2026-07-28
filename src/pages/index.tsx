import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { CertificateTemplate, DesignSettings, Recipient, BatchProgress, DEFAULT_DESIGN_SETTINGS } from '@/types/certificate';
import { BUILTIN_TEMPLATES } from '@/utils/templates';
import { downloadSingleCertificate, exportBatchToZip } from '@/utils/exportEngine';
import { Header } from '@/components/Header';
import { CertificateSettings } from '@/components/CertificateSettings';
import { LivePreview } from '@/components/LivePreview';
import { ProgressDialog } from '@/components/ProgressDialog';

const DEFAULT_DEMO_NAMES = [
  'Alex Morgan',
  'Dr. Sarah Jenkins',
  'Marcus Vance',
  'Elena Rostova',
  'Jonathan Sterling',
];

export default function Home() {
  // Recipient state
  const [manualText, setManualText] = useState<string>(DEFAULT_DEMO_NAMES.join('\n'));
  const [csvFilename, setCsvFilename] = useState<string | undefined>(undefined);
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate>(BUILTIN_TEMPLATES[0]);
  const [customTemplateDataUrl, setCustomTemplateDataUrl] = useState<string | null>(null);
  const [customImageElement, setCustomImageElement] = useState<HTMLImageElement | null>(null);

  // Design state
  const [designSettings, setDesignSettings] = useState<DesignSettings>(DEFAULT_DESIGN_SETTINGS);

  // Navigation state
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Batch Progress state
  const [progress, setProgress] = useState<BatchProgress>({
    isGenerating: false,
    current: 0,
    total: 0,
    currentName: '',
    status: 'idle',
  });

  const isCancelledRef = useRef<boolean>(false);
  const activeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Recipient list sync logic:
  // If CSV filename exists, use CSV recipients. Otherwise derive from manual text lines.
  useEffect(() => {
    if (!csvFilename) {
      const lines = manualText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const parsed: Recipient[] = lines.map((name, i) => ({
        id: `manual-${i}`,
        name,
      }));

      setRecipients(parsed.length > 0 ? parsed : [{ id: 'demo-1', name: 'Recipient Name' }]);
    }
  }, [manualText, csvFilename]);

  // Adjust active recipient index if out of bounds
  useEffect(() => {
    if (currentIndex >= recipients.length && recipients.length > 0) {
      setCurrentIndex(recipients.length - 1);
    }
  }, [recipients, currentIndex]);

  // Handlers for Recipient Input
  const handleNamesLoadedFromCsv = (csvRecipients: Recipient[], filename: string) => {
    setCsvFilename(filename);
    setRecipients(csvRecipients);
    setCurrentIndex(0);
  };

  const handleClearCsv = () => {
    setCsvFilename(undefined);
  };

  const handleManualTextChange = (text: string) => {
    setManualText(text);
    if (csvFilename) {
      setCsvFilename(undefined);
    }
  };

  // Handlers for Template Selection & Custom Upload
  const handleSelectTemplate = (template: CertificateTemplate) => {
    setSelectedTemplate(template);
  };

  const handleCustomTemplateUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomTemplateDataUrl(dataUrl);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          setCustomImageElement(img);

          const customTemplate: CertificateTemplate = {
            id: `custom-${Date.now()}`,
            name: 'Custom Uploaded Image',
            category: 'Custom',
            primaryColor: '#6366f1',
            accentColor: '#818cf8',
            customImageUrl: dataUrl,
          };

          setSelectedTemplate(customTemplate);
        };
        img.src = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  // Handlers for Design Controls
  const handleDesignSettingsChange = (partial: Partial<DesignSettings>) => {
    setDesignSettings((prev) => ({ ...prev, ...partial }));
  };

  const handleResetDesign = () => {
    setDesignSettings(DEFAULT_DESIGN_SETTINGS);
  };

  // Handlers for Single Export
  const handleDownloadSingle = (format: 'png' | 'jpg' | 'pdf') => {
    const canvas = activeCanvasRef.current;
    if (!canvas) return;

    const currentName = recipients[currentIndex]?.name || 'Recipient Name';
    downloadSingleCertificate(canvas, currentName, format);
  };

  // Handlers for Batch ZIP Export
  const handleDownloadBatchZip = async () => {
    if (recipients.length === 0) return;

    isCancelledRef.current = false;

    setProgress({
      isGenerating: true,
      current: 0,
      total: recipients.length,
      currentName: recipients[0]?.name || '',
      status: 'processing',
    });

    try {
      await exportBatchToZip(
        recipients,
        selectedTemplate,
        designSettings,
        (current, total, name) => {
          setProgress((prev) => ({
            ...prev,
            current,
            total,
            currentName: name,
          }));
        },
        isCancelledRef,
        customImageElement
      );

      setProgress((prev) => ({
        ...prev,
        isGenerating: false,
        status: 'completed',
      }));
    } catch (err: any) {
      if (isCancelledRef.current) {
        setProgress((prev) => ({
          ...prev,
          isGenerating: false,
          status: 'cancelled',
        }));
      } else {
        setProgress((prev) => ({
          ...prev,
          isGenerating: false,
          status: 'error',
          errorMessage: err.message || 'Export failed',
        }));
      }
    }
  };

  const handleCancelBatch = () => {
    isCancelledRef.current = true;
  };

  const handleCloseProgressDialog = () => {
    setProgress((prev) => ({ ...prev, status: 'idle' }));
  };

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    activeCanvasRef.current = canvas;
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col">
      <Head>
        <title>CertifyPro - Professional Certificate Studio</title>
        <meta name="description" content="Generate high-resolution custom bulk certificates instantly in your browser." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Studio Header */}
      <Header />

      {/* Main Content Split Layout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANEL (Settings) - 5 Columns */}
          <div className="lg:col-span-5 h-full">
            <CertificateSettings
              recipients={recipients}
              csvFilename={csvFilename}
              onNamesLoadedFromCsv={handleNamesLoadedFromCsv}
              onClearCsv={handleClearCsv}
              manualText={manualText}
              onManualTextChange={handleManualTextChange}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              customTemplateImage={customTemplateDataUrl}
              onCustomTemplateUpload={handleCustomTemplateUpload}
              designSettings={designSettings}
              onDesignSettingsChange={handleDesignSettingsChange}
              onResetDesign={handleResetDesign}
              onGenerate={handleDownloadBatchZip}
              isGenerating={progress.isGenerating}
            />
          </div>

          {/* RIGHT PANEL (Preview & Export) - 7 Columns */}
          <div className="lg:col-span-7 h-full">
            <LivePreview
              recipients={recipients}
              currentIndex={currentIndex}
              onIndexChange={setCurrentIndex}
              selectedTemplate={selectedTemplate}
              designSettings={designSettings}
              customTemplateImage={customImageElement}
              onDownloadSingle={handleDownloadSingle}
              onDownloadBatchZip={handleDownloadBatchZip}
              onCanvasReady={handleCanvasReady}
            />
          </div>
        </div>
      </main>

      {/* Global Progress Modal */}
      <ProgressDialog
        progress={progress}
        onCancel={handleCancelBatch}
        onClose={handleCloseProgressDialog}
      />
    </div>
  );
}
