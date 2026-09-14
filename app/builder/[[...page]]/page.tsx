import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-react';
import { customComponents } from '../../../builder-registry';

const API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

interface BuilderPageProps {
  params: Promise<{ page?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BuilderPage({ params, searchParams }: BuilderPageProps) {
  if (!API_KEY) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 32, background: '#f6f9fb', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxWidth: 680, padding: 36, borderRadius: 24, background: '#fff', border: '1px solid #dfe7ec', boxShadow: '0 20px 60px rgba(13,36,55,.08)' }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', color: '#0f766e' }}>DOKTER JAGA · BUILDER.IO</div>
          <h1 style={{ margin: '12px 0', color: '#0d2437' }}>Visual Design Mode siap digunakan.</h1>
          <p style={{ color: '#536b78', lineHeight: 1.7 }}>Tambahkan <code>NEXT_PUBLIC_BUILDER_API_KEY</code> ke environment variables agar halaman ini terhubung ke Builder.io Visual Editor.</p>
          <p style={{ color: '#536b78', lineHeight: 1.7, marginBottom: 0 }}>Setelah API key aktif, buka <code>/builder</code> untuk halaman Builder dan gunakan komponen Jaga Hero, Jaga Illustration, Module Card, Section, dan Quote secara drag-and-drop.</p>
        </div>
      </main>
    );
  }

  const { page } = await params;
  const search = await searchParams;
  const urlPath = '/builder' + (page?.length ? `/${page.join('/')}` : '');
  const content = await fetchOneEntry({
    model: 'page',
    apiKey: API_KEY,
    userAttributes: { urlPath },
    options: { enrich: true },
  });

  const previewParams = Object.fromEntries(
    Object.entries(search).flatMap(([key, value]) => (Array.isArray(value) ? value.map((v) => [key, v]) : value == null ? [] : [[key, value]])),
  );

  if (!content && !isPreviewing(previewParams)) {
    return <main style={{ padding: 48, fontFamily: 'Arial, sans-serif' }}>Builder page belum dibuat untuk <strong>{urlPath}</strong>.</main>;
  }

  return <Content model="page" apiKey={API_KEY} content={content} customComponents={customComponents} />;
}
