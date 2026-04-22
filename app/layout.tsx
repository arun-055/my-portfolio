import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arun Kumar Nath | Full-Stack Developer',
  description: 'Portfolio of Arun Kumar Nath — Software Developer, Problem Solver, AI Enthusiast. Specializing in Node.js, React, Next.js and scalable backend systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
