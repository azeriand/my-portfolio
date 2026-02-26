'use client'

import { Card, Button } from 'azeriand-library';
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoJavascript } from "react-icons/bi";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiStrapi } from "react-icons/si";
import { FaEnvelope } from "react-icons/fa";
import { TbRadar2 } from "react-icons/tb";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiStorybook } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { SiVite } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaGit } from "react-icons/fa6";


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
        
        <Card appearance='outlined' color='red' intensity={300} style={{ color: '#f59e31'}} className='flex flex-col gap-y-3 w-full h-fit rounded-xl'>
            <p className='font-bold' style={{ color: 'black' }}>Want to talk?</p>
            <p style={{ color: 'black' }} className='text-sm'>Feel free to check my resume and reach out for questions or just a friendly chat!</p>
            <section className='flex gap-x-2'>
                <Button appearance='mate' size='sm' color='red' intensity={200} icon={<FaArrowUpRightFromSquare/>} label='Resume' style={{ color: 'black', padding: '0.75rem 1rem' }} className='font-bold' onClick={openResume}/>
                <Button appearance='mate' size='sm' color='red' intensity={200} icon={<FaEnvelope/>} label="Contact me!" style={{ color: 'black', padding: '0.75rem 1rem' }} className='font-bold' onClick={mailTo}/>
            </section>
        </Card>
        
        <section className='grid grid-cols-5 grid-rows-2 justify-items-center w-full h-fit gap-1'>
            <Button appearance='mate' color='red' intensity={200} title='JavaScript' icon={<BiLogoJavascript size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='TypeScript' icon={<BiLogoTypescript size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='React' icon={<FaReact size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='Vite' icon={<SiVite size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='Tailwind CSS' icon={<RiTailwindCssFill size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='Next.js' icon={<RiNextjsFill size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='Git' icon={<FaGit size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='GitHub' icon={<FaGithub size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='Storybook' icon={<SiStorybook size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
            <Button appearance='mate' color='red' intensity={200} title='Strapi' icon={<SiStrapi size={24}/>} style={{ color: 'black' }} className='w-full aspect-square rounded-xl'/>
        </section>

        
    </div>
  );
}