import 'azeriand-library/dist/styles.css';
import "./globals.css";
import "./prose.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Sidebar from "./components/sidebar";
import Topbar from './components/topbar';

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className='h-screen overflow-hidden grid grid-cols-12 gap-x-4 px-8 pt-8 pb-4'>
        <section className='col-span-3'>
          <Sidebar/>
        </section>
        <section className='col-span-9 gap-y-4 flex flex-col h-full min-h-0'>
          <Topbar/>
          <div className='flex-1 overflow-y-auto'>
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
