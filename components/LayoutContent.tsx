'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith('/') || (pathname !== '/' && pathname !== '/about' && !pathname.startsWith('/about'));

  return (
    <main className={`flex-1 pt-16 md:pt-0 ${pathname === '/' || pathname.startsWith('/about') ? '' : 'md:ml-72'}`}>
      {children}
    </main>
  );
}
