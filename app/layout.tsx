import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Flat Five',
  description: 'Flat Five - Single Source Co-Broker',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
