import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';
import { CertificateTemplate, DesignSettings, Recipient } from '@/types/certificate';
import { renderCertificateToCanvas, CANVAS_WIDTH, CANVAS_HEIGHT } from './canvasRenderer';

/**
 * Download a single certificate canvas as PNG, JPG, or PDF.
 */
export function downloadSingleCertificate(
  canvas: HTMLCanvasElement,
  recipientName: string,
  format: 'png' | 'jpg' | 'pdf'
): void {
  const sanitizedName = (recipientName || 'certificate')
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_');

  if (format === 'png') {
    const dataUrl = canvas.toDataURL('image/png');
    saveAs(dataUrl, `${sanitizedName}_certificate.png`);
  } else if (format === 'jpg') {
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    saveAs(dataUrl, `${sanitizedName}_certificate.jpg`);
  } else if (format === 'pdf') {
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // Landscape A4 orientation in millimeters: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${sanitizedName}_certificate.pdf`);
  }
}

/**
 * Triggers confetti celebration effect on completion.
 */
export function triggerCompletionConfetti(): void {
  try {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  } catch {
    // Ignore if canvas-confetti fails
  }
}

/**
 * Export all recipient certificates as a compressed ZIP file with live progress reporting.
 */
export async function exportBatchToZip(
  recipients: Recipient[],
  template: CertificateTemplate,
  settings: DesignSettings,
  onProgress: (current: number, total: number, name: string) => void,
  isCancelledRef: { current: boolean },
  customImage?: HTMLImageElement | null
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('Certificates');

  // Create an offscreen canvas dedicated to batch rendering
  const batchCanvas = document.createElement('canvas');
  batchCanvas.width = CANVAS_WIDTH;
  batchCanvas.height = CANVAS_HEIGHT;

  const total = recipients.length;

  for (let i = 0; i < total; i++) {
    if (isCancelledRef.current) {
      throw new Error('Generation cancelled by user');
    }

    const recipient = recipients[i];
    onProgress(i + 1, total, recipient.name);

    // Render certificate to offscreen canvas
    await renderCertificateToCanvas(batchCanvas, recipient.name, template, settings, customImage);

    // Convert canvas to blob/base64
    const dataUrl = batchCanvas.toDataURL('image/png');
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');

    const sanitizedName = (recipient.name || `recipient_${i + 1}`)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/gi, '_');

    folder?.file(`${i + 1}_${sanitizedName}.png`, base64Data, { base64: true });

    // Yield control to event loop so UI updates live
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  // Generate ZIP file blob
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'certificates_batch.zip');

  // Trigger celebration!
  triggerCompletionConfetti();
}
