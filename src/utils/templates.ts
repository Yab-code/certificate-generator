import { CertificateTemplate } from '@/types/certificate';

export const BUILTIN_TEMPLATES: CertificateTemplate[] = [
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    category: 'Luxury',
    primaryColor: '#d97706',
    accentColor: '#fbbf24',
    defaultTitle: 'CERTIFICATE OF ACHIEVEMENT',
    defaultSubtitle: 'THIS CERTIFICATE IS PROUDLY PRESENTED TO',
    renderBackground: (ctx, width, height) => {
      // Warm ivory background
      const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
      bgGradient.addColorStop(0, '#fffdf9');
      bgGradient.addColorStop(1, '#fef9c3');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Outer Gold Border
      const margin = 40;
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 6;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      // Inner Gold Border
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(margin + 12, margin + 12, width - (margin + 12) * 2, height - (margin + 12) * 2);

      // Corner Ornaments
      const cornerSize = 70;
      const corners = [
        [margin + 12, margin + 12],
        [width - margin - 12, margin + 12],
        [margin + 12, height - margin - 12],
        [width - margin - 12, height - margin - 12],
      ];

      corners.forEach(([cx, cy], i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        const dirX = i % 2 === 0 ? 1 : -1;
        const dirY = i < 2 ? 1 : -1;

        ctx.moveTo(0, 0);
        ctx.lineTo(cornerSize * dirX, 0);
        ctx.lineTo(cornerSize * 0.7 * dirX, 10 * dirY);
        ctx.lineTo(10 * dirX, 10 * dirY);
        ctx.lineTo(10 * dirX, cornerSize * 0.7 * dirY);
        ctx.lineTo(0, cornerSize * dirY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // Top Certificate Header Banner Text Area
      ctx.fillStyle = '#b45309';
      ctx.font = 'bold 38px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF ACHIEVEMENT', width / 2, 140);

      // Subtitle
      ctx.fillStyle = '#64748b';
      ctx.font = '500 16px "Montserrat", sans-serif';
      ctx.fillText('THIS IS PROUDLY PRESENTED TO', width / 2, 185);

      // Decorative Seal Badge bottom right
      const sealX = width - 180;
      const sealY = height - 160;
      
      // Ribbon tail
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(sealX - 20, sealY + 20);
      ctx.lineTo(sealX - 45, sealY + 110);
      ctx.lineTo(sealX - 20, sealY + 95);
      ctx.lineTo(sealX + 5, sealY + 110);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(sealX + 5, sealY + 20);
      ctx.lineTo(sealX - 5, sealY + 110);
      ctx.lineTo(sealX + 20, sealY + 95);
      ctx.lineTo(sealX + 45, sealY + 110);
      ctx.closePath();
      ctx.fill();

      // Starburst Gold Seal
      ctx.save();
      ctx.translate(sealX, sealY);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      const points = 32;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? 55 : 48;
        const angle = (i * Math.PI) / points;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px "Montserrat", sans-serif';
      ctx.fillText('EXCELLENCE', 0, 4);
      ctx.restore();

      // Bottom Signature Lines
      const sigLineY = height - 120;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(180, sigLineY);
      ctx.lineTo(380, sigLineY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - 380, sigLineY);
      ctx.lineTo(width - 180, sigLineY);
      ctx.stroke();

      ctx.fillStyle = '#475569';
      ctx.font = '500 14px "Montserrat", sans-serif';
      ctx.fillText('Authorized Signature', 280, sigLineY + 25);
      ctx.fillText('Date of Issuance', width - 280, sigLineY + 25);
    },
  },
  {
    id: 'corporate-navy',
    name: 'Corporate Navy',
    category: 'Corporate',
    primaryColor: '#1e3a8a',
    accentColor: '#3b82f6',
    defaultTitle: 'CERTIFICATE OF APPRECIATION',
    defaultSubtitle: 'IN RECOGNITION OF DEDICATED SERVICE TO',
    renderBackground: (ctx, width, height) => {
      // Crisp white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Deep Navy Geometric Top & Left Shapes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.45, 0);
      ctx.lineTo(0, height * 0.35);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.35, 0);
      ctx.lineTo(0, height * 0.25);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.22, 0);
      ctx.lineTo(0, height * 0.15);
      ctx.closePath();
      ctx.fill();

      // Bottom Right Accent Shapes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(width, height);
      ctx.lineTo(width * 0.55, height);
      ctx.lineTo(width, height * 0.65);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(width, height);
      ctx.lineTo(width * 0.68, height);
      ctx.lineTo(width, height * 0.75);
      ctx.closePath();
      ctx.fill();

      // Border line
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, width - 60, height - 60);

      // Certificate Header
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 36px "Montserrat", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF APPRECIATION', width / 2 + 30, 150);

      ctx.fillStyle = '#2563eb';
      ctx.fillRect(width / 2 - 60 + 30, 170, 120, 4);

      ctx.fillStyle = '#64748b';
      ctx.font = '500 15px "Inter", sans-serif';
      ctx.fillText('FOR VALUABLE CONTRIBUTION AND EXEMPLARY PERFORMANCE', width / 2 + 30, 205);

      // Signature line
      const sigLineY = height - 130;
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(220, sigLineY);
      ctx.lineTo(420, sigLineY);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.font = '600 14px "Inter", sans-serif';
      ctx.fillText('Executive Officer', 320, sigLineY + 25);
    },
  },
  {
    id: 'academic-crest',
    name: 'Academic Crest',
    category: 'Academic',
    primaryColor: '#881337',
    accentColor: '#e11d48',
    defaultTitle: 'DIPLOMA OF EXCELLENCE',
    defaultSubtitle: 'HAS SUCCESSFULLY COMPLETED ALL ACADEMIC REQUIREMENTS FOR',
    renderBackground: (ctx, width, height) => {
      // Aged Parchment background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#fffbeb');
      grad.addColorStop(1, '#fef3c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Ornate Double Border
      ctx.strokeStyle = '#881337';
      ctx.lineWidth = 8;
      ctx.strokeRect(35, 35, width - 70, height - 70);

      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, width - 100, height - 100);

      // Header Text
      ctx.fillStyle = '#881337';
      ctx.font = '700 42px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.fillText('DIPLOMA OF EXCELLENCE', width / 2, 145);

      ctx.fillStyle = '#78350f';
      ctx.font = '500 16px "Cormorant Garamond", serif';
      ctx.fillText('THIS CERTIFIES THAT THE RECIPIENT', width / 2, 190);

      // University Crest Silhouette Top Center
      ctx.fillStyle = '#881337';
      ctx.beginPath();
      ctx.arc(width / 2, 85, 20, 0, Math.PI * 2);
      ctx.fill();

      // Signature area
      const sigLineY = height - 130;
      ctx.strokeStyle = '#881337';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(200, sigLineY);
      ctx.lineTo(400, sigLineY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - 400, sigLineY);
      ctx.lineTo(width - 200, sigLineY);
      ctx.stroke();

      ctx.fillStyle = '#451a03';
      ctx.font = '600 14px "Cinzel", serif';
      ctx.fillText('Dean of Academic Affairs', 300, sigLineY + 25);
      ctx.fillText('President of University', width - 300, sigLineY + 25);
    },
  },
  {
    id: 'emerald-excellence',
    name: 'Emerald Luxury',
    category: 'Luxury',
    primaryColor: '#064e3b',
    accentColor: '#10b981',
    defaultTitle: 'CERTIFICATE OF HONOR',
    defaultSubtitle: 'PRESENTED IN HIGHEST RECOGNITION TO',
    renderBackground: (ctx, width, height) => {
      // Soft Mint-white gradient
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, '#f0fdf4');
      bg.addColorStop(1, '#dcfce7');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Top & Bottom Emerald Banners
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, 40);
      ctx.lineTo(0, 60);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#047857';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width * 0.7, 0);
      ctx.lineTo(0, 30);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(width, height - 60);
      ctx.lineTo(0, height - 40);
      ctx.closePath();
      ctx.fill();

      // Gold Frame Lines
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 3;
      ctx.strokeRect(45, 75, width - 90, height - 150);

      // Header Text
      ctx.fillStyle = '#064e3b';
      ctx.font = 'bold 40px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF HONOR', width / 2, 160);

      ctx.fillStyle = '#047857';
      ctx.font = '600 15px "Montserrat", sans-serif';
      ctx.fillText('IN RECOGNITION OF DISTINGUISHED ACCOMPLISHMENT', width / 2, 205);
    },
  },
  {
    id: 'dark-luxury',
    name: 'Dark Obsidian Gold',
    category: 'Luxury',
    primaryColor: '#fbbf24',
    accentColor: '#f59e0b',
    defaultTitle: 'CERTIFICATE OF DISTINCTION',
    defaultSubtitle: 'PROUDLY CONFERRED UPON',
    renderBackground: (ctx, width, height) => {
      // Midnight Obsidian Dark Gradient
      const darkBg = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.8);
      darkBg.addColorStop(0, '#18181b');
      darkBg.addColorStop(1, '#09090b');
      ctx.fillStyle = darkBg;
      ctx.fillRect(0, 0, width, height);

      // Glowing Gold Outer Frame
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 4;
      ctx.strokeRect(35, 35, width - 70, height - 70);

      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1;
      ctx.strokeRect(45, 45, width - 90, height - 90);

      // Header Text
      ctx.fillStyle = '#fbbf24';
      ctx.font = '700 40px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF DISTINCTION', width / 2, 150);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '500 15px "Montserrat", sans-serif';
      ctx.fillText('PROUDLY CONFERRED UPON', width / 2, 195);
    },
  },
  {
    id: 'modern-minimal',
    name: 'Nordic Minimalist',
    category: 'Modern',
    primaryColor: '#0f172a',
    accentColor: '#64748b',
    defaultTitle: 'CERTIFICATE OF COMPLETION',
    defaultSubtitle: 'THIS IS TO CERTIFY THAT',
    renderBackground: (ctx, width, height) => {
      // Clean white background with soft border
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Subtle Frame
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, width - 100, height - 100);

      // Minimal accent dots top center
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(width / 2 - 15, 90, 4, 0, Math.PI * 2);
      ctx.arc(width / 2, 90, 4, 0, Math.PI * 2);
      ctx.arc(width / 2 + 15, 90, 4, 0, Math.PI * 2);
      ctx.fill();

      // Title
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 34px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF COMPLETION', width / 2, 155);

      ctx.fillStyle = '#64748b';
      ctx.font = '400 15px "Inter", sans-serif';
      ctx.fillText('THIS ACKNOWLEDGES THAT', width / 2, 195);
    },
  },
];
