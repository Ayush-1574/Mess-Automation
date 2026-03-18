import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mess Bill Management',
  description: 'Manage student mess bills and rebates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 relative overflow-hidden`}>
        {/* Persistent Global Background Mesh */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-20%] w-[60rem] h-[60rem] bg-sky-300/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-50"></div>
          <div className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        </div>

        {/* Main Content Layer */}
        <div className="relative z-10 h-screen w-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

