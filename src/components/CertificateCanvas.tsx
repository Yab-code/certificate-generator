import React, { useEffect, useRef, useState } from 'react';
import { CertificateTemplate, DesignSettings } from '@/types/certificate';
import { renderCertificateToCanvas } from '@/utils/canvasRenderer';
import { loadGoogleFont } from '@/utils/googleFonts';

interface CertificateCanvasProps {
  recipientName: string;
  template: CertificateTemplate;
  settings: DesignSettings;
  customImage: HTMLImageElement | null;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  recipientName,
  template,
  settings,
  customImage,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFontLoading, setIsFontLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsFontLoading(true);

    loadGoogleFont(settings.fontFamily).then(() => {
      if (isMounted) {
        setIsFontLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [settings.fontFamily]);

  const [aspectRatio, setAspectRatio] = useState<string>('16/9');

  useEffect(() => {
    if (template.id.startsWith('custom-') && customImage) {
      const w = customImage.naturalWidth || customImage.width;
      const h = customImage.naturalHeight || customImage.height;
      if (w && h) {
        setAspectRatio(`${w}/${h}`);
        return;
      }
    }
    if (template.width && template.height) {
      setAspectRatio(`${template.width}/${template.height}`);
      return;
    }
    setAspectRatio('16/9');
  }, [template, customImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderCertificateToCanvas(canvas, recipientName, template, settings, customImage).then(() => {
      if (onCanvasReady) {
        onCanvasReady(canvas);
      }
    });
  }, [recipientName, template, settings, customImage, isFontLoading, onCanvasReady]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isFontLoading && (
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-10 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-700 shadow-xl">
            <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            Loading font {settings.fontFamily}...
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-h-[580px] object-contain rounded-lg shadow-2xl transition-all"
        style={{ aspectRatio }}
      />
    </div>
  );
};
