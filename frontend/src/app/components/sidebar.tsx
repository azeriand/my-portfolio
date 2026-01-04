'use client'
import { Card, Button } from 'azeriand-library';
import { FaReact } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className='w-full flex flex-col gap-y-4'>
        <Card noPadding>
            <img src='/azeriand.png' alt="Azeriand Logo" className='w-full'/>
            <Card>Hello! I'm Andrea lore ipsum bla bla bla</Card>
        </Card>
        <Card className='text-lg text-center'>Available for new projects</Card>
        <section className='grid grid-cols-12 gap-x-3 w-full h-[4rem]'>
            <Button icon={<FaFileDownload/>} color="red" label='Resume' className='col-span-6 w-full'/>
            <Button icon={<FaEnvelope/>} label="Let's talk!" className='col-span-6 w-full'/>
        </section>
        <section className='grid grid-cols-4 grid-rows-2 justify-items-center w-full gap-4'>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
            <Button icon={<FaReact/>} className='w-full h-full'/>
        </section>
    </div>
  );
}