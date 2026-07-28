import { CertificateTemplate, DesignSettings } from '@/types/certificate';

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export async function renderCertificateToCanvas(
  canvas: HTMLCanvasElement,
  recipientName: string,
  template: CertificateTemplate,
  settings: DesignSettings,
  loadedCustomImage?: HTMLImageElement | null
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set standard canvas dimensions for high DPI
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  // 1. Clear Canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 2. Render Template Background
  if (template.id.startsWith('custom-') && loadedCustomImage) {
    ctx.drawImage(loadedCustomImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else if (template.renderBackground) {
    template.renderBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else {
    // Fallback solid fill
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // 3. Render Recipient Name
  if (!recipientName || recipientName.trim() === '') {
    recipientName = 'Recipient Name';
  }

  // Calculate text coordinates based on percentage sliders
  const x = (settings.horizontalPosition / 100) * CANVAS_WIDTH;
  const y = (settings.verticalPosition / 100) * CANVAS_HEIGHT;

  const maxAllowedWidth = (settings.maxTextWidth / 100) * CANVAS_WIDTH;

  ctx.save();

  // Configure text direction & alignment
  if (settings.isRtl) {
    ctx.direction = 'rtl';
    ctx.textAlign = settings.horizontalPosition > 70 ? 'right' : settings.horizontalPosition < 30 ? 'left' : 'center';
  } else {
    ctx.direction = 'ltr';
    ctx.textAlign = 'center';
  }

  ctx.textBaseline = 'middle';

  // Base font size scaling (settings.fontSize is in UI scale 10–100, canvas operates at 1920x1080)
  // Scale factor e.g. fontSize 48 -> ~72px on 1920x1080 canvas
  let currentFontSize = Math.round(settings.fontSize * 1.6);
  ctx.font = `${settings.fontWeight} ${currentFontSize}px "${settings.fontFamily}", sans-serif`;

  // Auto-fit long names calculation
  if (settings.autoFitLongNames) {
    let measuredWidth = ctx.measureText(recipientName).width;
    if (measuredWidth > maxAllowedWidth) {
      const scaleFactor = maxAllowedWidth / measuredWidth;
      currentFontSize = Math.max(16, Math.floor(currentFontSize * scaleFactor));
      ctx.font = `${settings.fontWeight} ${currentFontSize}px "${settings.fontFamily}", sans-serif`;
    }
  }

  // Configure Shadow
  if (settings.hasShadow) {
    ctx.shadowColor = settings.shadowColor || 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = settings.shadowBlur || 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Text Color
  ctx.fillStyle = settings.fontColor;

  // Render text with letter spacing support if supported or manual spacing
  if ('letterSpacing' in ctx) {
    // @ts-ignore
    ctx.letterSpacing = `${settings.letterSpacing}px`;
  }

  // Multi-line support if recipient name contains line breaks
  const lines = recipientName.split('\n');
  const lineSpacing = currentFontSize * settings.lineHeight;
  const startY = y - ((lines.length - 1) * lineSpacing) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineSpacing);
  });

  ctx.restore();
}
