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

  // Determine target canvas dimensions: custom image dimensions or standard 1920x1080
  let width = CANVAS_WIDTH;
  let height = CANVAS_HEIGHT;

  if (template.id.startsWith('custom-') && loadedCustomImage) {
    width = loadedCustomImage.naturalWidth || loadedCustomImage.width || CANVAS_WIDTH;
    height = loadedCustomImage.naturalHeight || loadedCustomImage.height || CANVAS_HEIGHT;
  } else if (template.width && template.height) {
    width = template.width;
    height = template.height;
  }

  // Set canvas dimensions to exact custom image dimensions
  canvas.width = width;
  canvas.height = height;

  // 1. Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // 2. Render Template Background
  if (template.id.startsWith('custom-') && loadedCustomImage) {
    ctx.drawImage(loadedCustomImage, 0, 0, width, height);
  } else if (template.renderBackground) {
    template.renderBackground(ctx, width, height);
  } else {
    // Fallback solid fill
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  // 3. Render Recipient Name
  if (!recipientName || recipientName.trim() === '') {
    recipientName = 'Recipient Name';
  }

  // Calculate text coordinates based on percentage sliders
  const x = (settings.horizontalPosition / 100) * width;
  const y = (settings.verticalPosition / 100) * height;

  const maxAllowedWidth = (settings.maxTextWidth / 100) * width;

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

  // Base font size scaling relative to standard 1920 width
  const dimensionScale = width / CANVAS_WIDTH;
  let currentFontSize = Math.round(settings.fontSize * 1.6 * dimensionScale);
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
    ctx.shadowBlur = Math.round((settings.shadowBlur || 8) * dimensionScale);
    ctx.shadowOffsetX = Math.round(3 * dimensionScale);
    ctx.shadowOffsetY = Math.round(3 * dimensionScale);
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Text Color
  ctx.fillStyle = settings.fontColor;

  // Render text with letter spacing support if supported
  if ('letterSpacing' in ctx) {
    // @ts-ignore
    ctx.letterSpacing = `${settings.letterSpacing * dimensionScale}px`;
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
