'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Card, Button, Avatar } from 'azeriand-library';
import { TbRadar2 } from "react-icons/tb";
import { FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

/**
 * Compact top navigation for tablet/mobile (<1024px).
 * The full identity sidebar remains the desktop experience; this component
 * only changes how the SAME navigation/actions are presented on small screens.
 * It does not introduce new destinations, copy or routes.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const openResume = () => { window.open("/resume_andrea_romera_costa.pdf", "_blank", "noopener,noreferrer"); };
  const myLibraryLink = () => { window.open('https://library.andrearc.com/', "_blank", "noopener,noreferrer"); };
  const githubProfile = () => { window.open('https://github.com/azeriand', "_blank", "noopener,noreferrer"); };
  const linkedinProfile = () => { window.open('https://www.linkedin.com/in/a-romera-costa/', "_blank", "noopener,noreferrer"); };
  const mailTo = 'mailto:a.romeracosta@gmail.com';

  // Close on Escape and return focus to the menu button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) {
      const firstLink = drawerRef.current?.querySelector<HTMLElement>('a, button');
      firstLink?.focus();
    }
  }, [open]);

  const closeAnd = (fn?: () => void) => () => {
    setOpen(false);
    fn?.();
  };

  const closeAndFocusButton = () => {
    setOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div>
      <Card appearance='mate' noPadding color='red' intensity={200} className='flex items-center justify-between gap-x-3 py-2 px-4 rounded-xl'>
        <Link href='/' className='flex items-center gap-x-3 min-w-0' aria-label='Andrea Romera - home'>
          <Avatar src="/azeriand.jpg" className='card shrink-0'/>
          <span className='flex flex-col min-w-0'>
            <span className='font-bold truncate' style={{ color: '#f54c4a' }}>Andrea Romera</span>
            <span className='text-xs truncate' style={{ color: 'black' }}>Frontend Developer</span>
          </span>
        </Link>
        <div className='flex items-center gap-x-2 shrink-0'>
          <Link
            href={mailTo}
            aria-label='Send email'
            className='nav-focusable card click flex items-center justify-center h-11 w-11 rounded-xl'
            style={{ color: 'black' }}
          >
            <FaEnvelope size={20}/>
          </Link>
          <button
            ref={menuButtonRef}
            type='button'
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls='mobile-nav-drawer'
            aria-label={open ? 'Close menu' : 'Open menu'}
            className='nav-focusable card click flex items-center justify-center h-11 w-11 rounded-xl'
            style={{ color: 'black' }}
          >
            {open ? <FaXmark size={22}/> : <FaBars size={22}/>}
          </button>
        </div>
      </Card>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40 bg-black/30'
            onClick={() => setOpen(false)}
            aria-hidden='true'
          />
          {/* Drawer */}
          <div
            id='mobile-nav-drawer'
            ref={drawerRef}
            role='dialog'
            aria-modal='true'
            aria-label='Navigation menu'
            className='fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs overflow-y-auto p-4'
            style={{ background: 'var(--background)' }}
          >
            <div className='flex justify-end mb-4'>
              <button
                type='button'
                onClick={closeAndFocusButton}
                aria-label='Close menu'
                className='nav-focusable card click flex items-center justify-center h-11 w-11 rounded-xl'
                style={{ color: 'black' }}
              >
                <FaXmark size={22}/>
              </button>
            </div>

            <nav className='flex flex-col gap-y-2' aria-label='Primary'>
              <Link href='/projects' onClick={() => setOpen(false)}>
                <Button appearance='ghost' color='red' intensity={600} label='Projects' className='w-full justify-start' style={{ color: 'black' }}/>
              </Link>
              <Link href='/articles' onClick={() => setOpen(false)}>
                <Button appearance='ghost' color='red' intensity={600} label='Articles' className='w-full justify-start' style={{ color: 'black' }}/>
              </Link>
              <Button appearance='ghost' color='red' intensity={600} label='Library' icon={<FaArrowUpRightFromSquare/>} className='w-full justify-start' style={{ color: 'black' }} onClick={closeAnd(myLibraryLink)}/>
              <Button appearance='ghost' color='red' intensity={600} label='Resume' icon={<FaArrowUpRightFromSquare/>} className='w-full justify-start' style={{ color: 'black' }} onClick={closeAnd(openResume)}/>
            </nav>

            <div className='mt-4 flex p-2 text-sm text-black font-bold justify-center items-center gap-x-2 bg-green-100 border! border-green-200! rounded-lg'>
              <TbRadar2 size={18}/>
              <p>Available for new projects</p>
            </div>

            <div className='mt-4 flex gap-x-3 justify-center'>
              <Link href={mailTo} onClick={() => setOpen(false)} aria-label='Send email'>
                <Button appearance='ghost' color='red' intensity={600} icon={<FaEnvelope size={20}/>} style={{ color: 'black' }} aria-label='Send email'/>
              </Link>
              <Button appearance='ghost' color='red' intensity={600} icon={<FaLinkedinIn size={20}/>} style={{ color: 'black' }} aria-label='LinkedIn profile' onClick={closeAnd(linkedinProfile)}/>
              <Button appearance='ghost' color='red' intensity={600} icon={<FaGithub size={20}/>} style={{ color: 'black' }} aria-label='GitHub profile' onClick={closeAnd(githubProfile)}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
