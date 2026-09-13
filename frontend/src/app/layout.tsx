import 'azeriand-library/dist/styles.css';
import "./globals.css";
import "./prose.css";
import React from "react";
import Sidebar from "./components/sidebar";
import Topbar from './components/topbar';
import MobileNav from './components/mobileNav';
import MdIdentityCard from './components/mdIdentityCard';

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
      {/* App shell: the viewport is locked; the sidebar and topbar stay fixed
          in place and only the content region scrolls. */}
      <body className='h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-x-4 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-4'>
        {/* Identity sidebar: desktop only, fixed (does not scroll with content) */}
        <section className='hidden lg:block lg:col-span-3 lg:h-full lg:overflow-hidden'>
          <Sidebar/>
        </section>
        <section className='lg:col-span-9 flex flex-col min-w-0 h-full min-h-0'>
          {/* Fixed header: compact drawer below md, full horizontal topbar from md up */}
          <header className='shrink-0 flex flex-col gap-y-2'>
            <div className='md:hidden'>
              <MobileNav/>
            </div>
            <div className='hidden md:block'>
              <Topbar/>
            </div>
          </header>
          {/* The only scrolling region */}
          <div className='flex-1 min-h-0 min-w-0 overflow-y-auto mt-4 flex flex-col gap-y-4'>
            {/* Identity card shown only in the md range (navbar not collapsed).
                Below md the collapsed nav (MobileNav) shows availability instead.
                At lg+ the sidebar shows the identity. */}
            <div className='hidden md:block lg:hidden'>
              <MdIdentityCard/>
            </div>
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
