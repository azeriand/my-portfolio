'use client'
import { Card, Button } from 'azeriand-library';
import { FaReact } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { MdWifiTethering } from "react-icons/md";


export default function Sidebar() {
  return (
    <div className='w-full flex flex-col gap-y-4'>
        <Card noPadding appearance='ghost'>
            <img src='/azeriand.png' alt="Azeriand Logo" className='w-full'/>
            <Card appearance='mate' color='red' intensity={500} style={{ color: 'white' }}>Hello! I'm Andrea lore ipsum bla bla bla</Card>
        </Card>
        <Card appearance='mate' color='blue' intensity={700} style={{ color: 'black' }} className='text-lg text-center flex items-center gap-x-2 justify-center'>
            <MdWifiTethering/>
            Available for new projects
        </Card>
        <section className='grid grid-cols-12 gap-x-3 w-full h-[4rem]'>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaFileDownload/>} label='Resume' style={{ color: 'black' }} className='col-span-6 w-full font-bold'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaEnvelope/>} label="Let's talk!" style={{ color: 'black' }} className='col-span-6 w-full font-bold'/>
        </section>
        <section className='grid grid-cols-4 grid-rows-2 justify-items-center w-full gap-4'>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact/>} style={{ color: 'black' }} className='w-full h-full'/>
        </section>
    </div>
  );
}