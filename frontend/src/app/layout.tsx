import 'azeriand-library/dist/styles.css';
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Sidebar from "./components/sidebar";
import Topbar from './components/topbar';

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className='grid grid-cols-12 gap-x-4 p-12'>
        <section className='col-span-3'>
          <Sidebar/>
        </section>
        <section className='col-span-9 gap-y-4 flex flex-col'>
          <Topbar/>
          {children}
        </section>
      </body>
    </html>
  );
}
