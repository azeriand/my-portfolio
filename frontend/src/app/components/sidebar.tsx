'use client'

import { Card, Button } from 'azeriand-library';
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { TbRadar2 } from "react-icons/tb";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiStorybook } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { SiVite } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export default function Sidebar() {

    const mailTo = () => {window.location.href = 'mailto: a.romeracosta@gmail.com'}
    const openResume = () => {window.open("/resume_andrea_romera_costa.pdf", "_blank");};


  return (
    <div className='w-full flex flex-col gap-y-4'>
        <img src='/azeriand.png' alt="Azeriand Logo" className='w-full rounded-xl'/>
        <Card noPadding appearance='mate' color='red' intensity={200} className='flex flex-col gap-y-3 p-10 rounded-xl'>
            <section>
                <h1 style={{color: '#f54c4a', textShadow: '0 1px 2px rgba(0,0,0,0.2)'}} className='text-[1.9rem]! font-extrabold! flex-wrap'>Andrea Romera</h1>
                <h2 style={{color: '#fefefe', textShadow: '0 1px 2px rgba(0,0,0,0.2)'}} className='text-[1.25rem]! font-semibold!'>Frontend Developer</h2>
            </section>
            <p style={{ color: 'black' }} className='text-sm'></p>
            <div className='flex p-2 text-sm text-black font-bold justify-center items-center gap-x-2 bg-green-100 border! border-green-200! rounded-lg'>
                <TbRadar2 size={18}/>
                <p>Available for new projects</p> 
            </div>
        </Card>
        
        <section className='grid grid-cols-12 gap-x-1 w-full h-16'>
            <Button appearance='mate' color='red' intensity={300} icon={<FaArrowUpRightFromSquare/>} label='Resume' style={{ color: 'black' }} className='col-span-6 w-full font-bold rounded-xl' onClick={openResume}/>
            <Button appearance='mate' color='red' intensity={300} icon={<FaEnvelope/>} label="Let's talk!" style={{ color: 'black' }} className='col-span-6 w-full font-bold rounded-xl' onClick={mailTo}/>
        </section>
        <section className='grid grid-cols-4 grid-rows-2 justify-items-center w-full gap-1'>
            <Button appearance='mate' color='red' intensity={200} icon={<IoLogoJavascript size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<FaReact size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<RiTailwindCssFill size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<RiNextjsFill size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<BiLogoTypescript size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<FaGithub size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<SiVite size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} icon={<SiStorybook size={30}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>

        </section>
    </div>
  );
}