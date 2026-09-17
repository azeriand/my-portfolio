'use client'

import { Card } from 'azeriand-library';
import { TbRadar2 } from "react-icons/tb";

export default function MdIdentityCard() {
  return (
    <Card noPadding appearance='mate' color='red' intensity={200} className='flex flex-row items-center justify-between gap-4 p-6 rounded-xl'>
      <section className='min-w-0'>
        <p style={{ color: 'var(--text-red)', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }} className='text-2xl font-extrabold break-words'>Andrea Romera</p>
        <p style={{ color: 'var(--text-role)' }} className='text-lg font-semibold'>Frontend Developer</p>
      </section>
      <div className='flex shrink-0 p-2 text-sm text-black font-bold justify-center items-center gap-x-2 bg-green-100 border! border-green-200! rounded-lg'>
        <TbRadar2 size={18} className='shrink-0'/>
        <span>Available for new projects</span>
      </div>
    </Card>
  );
}
