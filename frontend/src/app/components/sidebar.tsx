'use client'

import { Card, Button } from 'azeriand-library';
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { MdWifiTethering } from "react-icons/md";


export default function Sidebar() {

    const mailTo = () => {window.location.href = 'mailto: a.romeracosta@gmail.com'}
    const myResumeLink = () => {window.open('https://www.youtube.com/watch?v=oHg5SJYRHA0&t=2s')}


  return (
    <div className='w-full flex flex-col gap-y-4'>
        <Card noPadding appearance='ghost'>
            <img src='/azeriand.png' alt="Azeriand Logo" className='w-full'/>
            <Card appearance='mate' color='red' intensity={500} style={{ color: 'white' }} className='flex flex-col gap-y-4'>
                <p style={{color: '#f54c4a'}} className='text-xl font-bold'>Hello! I'm Andrea Romera.</p>
                <p style={{ color: 'black' }} className='text-sm'>A passionate Frontend Developer with experience in building web applications using modern technologies. I love creating efficient and scalable solutions that deliver great user experiences.</p>
            </Card>
        </Card>
        <Card appearance='mate' color='blue' intensity={700} style={{ color: 'black' }} className='text-lg text-center flex items-center gap-x-2 justify-center'>
            <MdWifiTethering size={24}/>
            Available for new projects
        </Card>
        <section className='grid grid-cols-12 gap-x-1 w-full h-[4rem]'>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaFileDownload/>} label='Resume' style={{ color: 'black' }} className='col-span-6 w-full font-bold' onClick={myResumeLink}/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaEnvelope/>} label="Let's talk!" style={{ color: 'black' }} className='col-span-6 w-full font-bold' onClick={mailTo}/>
        </section>
        <section className='grid grid-cols-4 grid-rows-2 justify-items-center w-full gap-1'>
            <Button appearance='mate' color='blue' intensity={700} icon={<IoLogoJavascript size={30}/>} style={{ color: 'black' }} className='w-full aspect-square'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<FaReact size={30}/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<RiTailwindCssFill size={30}/>} style={{ color: 'black' }} className='w-full h-full'/>
            <Button appearance='mate' color='blue' intensity={700} icon={<RiNextjsFill size={30}/>} style={{ color: 'black' }} className='w-full h-full'/>
        </section>
    </div>
  );
}