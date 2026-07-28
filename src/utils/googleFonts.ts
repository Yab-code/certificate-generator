export interface FontOption {
  name: string;
  category: 'Serif' | 'Sans-Serif' | 'Cursive' | 'Display';
  weights: string[];
}

export const FONT_OPTIONS: FontOption[] = [
  { name: 'Playfair Display', category: 'Serif', weights: ['400', '500', '600', '700', '800', '900'] },
  { name: 'Great Vibes', category: 'Cursive', weights: ['400'] },
  { name: 'Cinzel', category: 'Serif', weights: ['400', '500', '600', '700', '800', '900'] },
  { name: 'Alex Brush', category: 'Cursive', weights: ['400'] },
  { name: 'Montserrat', category: 'Sans-Serif', weights: ['300', '400', '500', '600', '700', '800'] },
  { name: 'Inter', category: 'Sans-Serif', weights: ['300', '400', '500', '600', '700', '800'] },
  { name: 'Roboto', category: 'Sans-Serif', weights: ['300', '400', '500', '700', '900'] },
  { name: 'Dancing Script', category: 'Cursive', weights: ['400', '500', '600', '700'] },
  { name: 'Cormorant Garamond', category: 'Serif', weights: ['300', '400', '500', '600', '700'] },
  { name: 'Oswald', category: 'Display', weights: ['300', '400', '500', '600', '700'] },
  { name: 'Parisienne', category: 'Cursive', weights: ['400'] },
  { name: 'Tangerine', category: 'Cursive', weights: ['400', '700'] },
];

export const FONT_WEIGHTS = [
  { label: 'Light (300)', value: '300' },
  { label: 'Regular (400)', value: '400' },
  { label: 'Medium (500)', value: '500' },
  { label: 'Semi-Bold (600)', value: '600' },
  { label: 'Bold (700)', value: '700' },
  { label: 'Extra Bold (800)', value: '800' },
  { label: 'Black (900)', value: '900' },
];

const loadedFonts = new Set<string>();

export function loadGoogleFont(fontName: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (loadedFonts.has(fontName)) return Promise.resolve();

  return new Promise((resolve) => {
    const formattedFont = fontName.replace(/ /g, '+');
    const linkId = `google-font-${fontName.toLowerCase().replace(/ /g, '-')}`;

    if (document.getElementById(linkId)) {
      loadedFonts.add(fontName);
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@300;400;500;600;700;800;900&display=swap`;

    link.onload = () => {
      loadedFonts.add(fontName);
      // Ensure font is loaded in document fonts API if available
      if ('fonts' in document) {
        document.fonts.ready.then(() => resolve());
      } else {
        setTimeout(resolve, 300);
      }
    };

    link.onerror = () => {
      // Fall back gracefully if font fail
      resolve();
    };

    document.head.appendChild(link);
  });
}
