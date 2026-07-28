export interface DesignSettings {
  // Text positioning
  verticalPosition: number; // 0 - 100%
  horizontalPosition: number; // 0 - 100%
  
  // Typography
  fontSize: number; // 10 - 100px
  fontFamily: string;
  fontWeight: string;
  fontColor: string;
  
  // Advanced styling
  isRtl: boolean;
  hasShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  letterSpacing: number; // -5 to 20px
  lineHeight: number; // 0.8 to 2.5
  maxTextWidth: number; // 20 to 100%
  autoFitLongNames: boolean;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  category: 'Classic' | 'Modern' | 'Academic' | 'Corporate' | 'Luxury' | 'Custom';
  thumbnailUrl?: string;
  customImageUrl?: string;
  primaryColor: string;
  accentColor: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
  renderBackground?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

export interface Recipient {
  id: string;
  name: string;
  metadata?: string;
}

export interface BatchProgress {
  isGenerating: boolean;
  current: number;
  total: number;
  currentName: string;
  status: 'idle' | 'processing' | 'completed' | 'cancelled' | 'error';
  errorMessage?: string;
}

export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  verticalPosition: 50,
  horizontalPosition: 50,
  fontSize: 48,
  fontFamily: 'Playfair Display',
  fontWeight: '700',
  fontColor: '#1e293b',
  isRtl: false,
  hasShadow: false,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowBlur: 4,
  letterSpacing: 1,
  lineHeight: 1.2,
  maxTextWidth: 80,
  autoFitLongNames: true,
};
