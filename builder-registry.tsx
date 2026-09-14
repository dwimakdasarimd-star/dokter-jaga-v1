import type { CSSProperties, ReactNode } from 'react';
import type { RegisteredComponent } from '@builder.io/sdk-react';

const wrapStyle = (backgroundColor: string, padding: number, radius: number): CSSProperties => ({
  background: backgroundColor,
  padding: `${padding}px`,
  borderRadius: `${radius}px`,
  width: '100%',
  boxSizing: 'border-box',
});

export function JagaSection({ children, backgroundColor = '#f6f9fb', padding = 24, radius = 24 }: { children?: ReactNode; backgroundColor?: string; padding?: number; radius?: number }) {
  return <section style={wrapStyle(backgroundColor, padding, radius)}>{children}</section>;
}

export function JagaImage({
  image,
  alt = 'Dokter Jaga illustration',
  width = 320,
  height = 320,
  x = 0,
  y = 0,
  rotation = 0,
  opacity = 1,
  radius = 0,
  objectFit = 'contain',
}: {
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotation?: number;
  opacity?: number;
  radius?: number;
  objectFit?: 'contain' | 'cover' | 'fill';
}) {
  if (!image) return null;
  return (
    <img
      src={image}
      alt={alt}
      style={{
        display: 'block',
        width,
        height,
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        opacity,
        borderRadius: radius,
        objectFit,
        maxWidth: '100%',
      }}
    />
  );
}

export function JagaHero({
  eyebrow = 'DOKTER JAGA · CLINICAL WORKSPACE',
  title = 'Belajar. Berpikir. Siap Praktik.',
  subtitle = 'Clinical education dan practical resources untuk dokter Indonesia.',
  mascot = '/dokter-jaga-mascot.svg',
  backgroundColor = '#eaf7f5',
  titleColor = '#0d2437',
  accentColor = '#0f766e',
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  mascot?: string;
  backgroundColor?: string;
  titleColor?: string;
  accentColor?: string;
}) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', alignItems: 'center', gap: 32, padding: '48px 52px', borderRadius: 28, background: backgroundColor, color: titleColor }}>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 650 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', color: accentColor, marginBottom: 14 }}>{eyebrow}</div>
        <h1 style={{ margin: 0, fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-.04em' }}>{title}</h1>
        <p style={{ margin: '18px 0 0', maxWidth: 560, fontSize: 17, lineHeight: 1.65, color: '#536b78' }}>{subtitle}</p>
      </div>
      {mascot && <img src={mascot} alt="Dokter Jaga" style={{ position: 'absolute', right: 18, bottom: -20, width: 'min(36vw, 380px)', maxHeight: 380, objectFit: 'contain' }} />}
    </section>
  );
}

export function JagaModuleCard({
  title = 'Clinical Cases',
  description = 'Kasus klinis dengan pembahasan lengkap',
  meta = '50 kasus',
  href = '/cases',
  image,
  tone = '#0f766e',
}: {
  title?: string;
  description?: string;
  meta?: string;
  href?: string;
  image?: string;
  tone?: string;
}) {
  return (
    <a href={href} style={{ display: 'flex', alignItems: 'center', gap: 16, minHeight: 130, padding: 22, borderRadius: 20, background: '#fff', border: '1px solid #dfe7ec', textDecoration: 'none', color: '#0d2437', boxShadow: '0 10px 28px rgba(13,36,55,.05)' }}>
      {image ? <img src={image} alt="" style={{ width: 54, height: 54, objectFit: 'contain', flex: '0 0 auto' }} /> : <span style={{ width: 54, height: 54, borderRadius: 16, background: `${tone}16`, display: 'grid', placeItems: 'center', color: tone, fontWeight: 900 }}>DJ</span>}
      <span style={{ display: 'grid', gap: 6 }}><strong style={{ fontSize: 17 }}>{title}</strong><small style={{ color: '#607784', lineHeight: 1.45 }}>{description}</small><em style={{ color: tone, fontSize: 12, fontStyle: 'normal', fontWeight: 800 }}>{meta}</em></span>
    </a>
  );
}

export function JagaQuote({ text = 'Belajar. Berpikir. Siap Praktik.', author = 'Dokter Jaga', backgroundColor = '#0d2437' }: { text?: string; author?: string; backgroundColor?: string }) {
  return <blockquote style={{ margin: 0, padding: '30px 34px', borderRadius: 22, background: backgroundColor, color: '#fff', fontSize: 22, lineHeight: 1.5 }}><span style={{ display: 'block', fontSize: 42, lineHeight: .7, opacity: .45 }}>“</span>{text}<footer style={{ marginTop: 14, fontSize: 12, opacity: .65 }}>— {author}</footer></blockquote>;
}

export const customComponents: RegisteredComponent[] = [
  {
    component: JagaSection,
    name: 'Jaga Section',
    canHaveChildren: true,
    inputs: [
      { name: 'backgroundColor', type: 'color', defaultValue: '#f6f9fb' },
      { name: 'padding', type: 'number', defaultValue: 24 },
      { name: 'radius', type: 'number', defaultValue: 24 },
    ],
  },
  {
    component: JagaImage,
    name: 'Jaga Illustration',
    inputs: [
      { name: 'image', type: 'file', allowedFileTypes: ['png', 'jpg', 'jpeg', 'svg', 'webp'] },
      { name: 'alt', type: 'string', defaultValue: 'Dokter Jaga illustration' },
      { name: 'width', type: 'number', defaultValue: 320 },
      { name: 'height', type: 'number', defaultValue: 320 },
      { name: 'x', type: 'number', defaultValue: 0 },
      { name: 'y', type: 'number', defaultValue: 0 },
      { name: 'rotation', type: 'number', defaultValue: 0 },
      { name: 'opacity', type: 'number', defaultValue: 1, min: 0, max: 1 },
      { name: 'radius', type: 'number', defaultValue: 0 },
      { name: 'objectFit', type: 'enum', enum: ['contain', 'cover', 'fill'], defaultValue: 'contain' },
    ],
  },
  {
    component: JagaHero,
    name: 'Jaga Hero',
    inputs: [
      { name: 'eyebrow', type: 'string', defaultValue: 'DOKTER JAGA · CLINICAL WORKSPACE' },
      { name: 'title', type: 'string', defaultValue: 'Belajar. Berpikir. Siap Praktik.' },
      { name: 'subtitle', type: 'longText', defaultValue: 'Clinical education dan practical resources untuk dokter Indonesia.' },
      { name: 'mascot', type: 'file', allowedFileTypes: ['png', 'jpg', 'jpeg', 'svg', 'webp'], defaultValue: '/dokter-jaga-mascot.svg' },
      { name: 'backgroundColor', type: 'color', defaultValue: '#eaf7f5' },
      { name: 'titleColor', type: 'color', defaultValue: '#0d2437' },
      { name: 'accentColor', type: 'color', defaultValue: '#0f766e' },
    ],
  },
  {
    component: JagaModuleCard,
    name: 'Jaga Module Card',
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Clinical Cases' },
      { name: 'description', type: 'longText', defaultValue: 'Kasus klinis dengan pembahasan lengkap' },
      { name: 'meta', type: 'string', defaultValue: '50 kasus' },
      { name: 'href', type: 'url', defaultValue: '/cases' },
      { name: 'image', type: 'file', allowedFileTypes: ['png', 'jpg', 'jpeg', 'svg', 'webp'] },
      { name: 'tone', type: 'color', defaultValue: '#0f766e' },
    ],
  },
  {
    component: JagaQuote,
    name: 'Jaga Quote',
    inputs: [
      { name: 'text', type: 'longText', defaultValue: 'Belajar. Berpikir. Siap Praktik.' },
      { name: 'author', type: 'string', defaultValue: 'Dokter Jaga' },
      { name: 'backgroundColor', type: 'color', defaultValue: '#0d2437' },
    ],
  },
];
