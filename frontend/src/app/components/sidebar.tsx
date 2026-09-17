'use client'

import { Card, Button } from 'azeriand-library';
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoJavascript } from "react-icons/bi";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiStrapi } from "react-icons/si";
import { FaEnvelope } from "react-icons/fa";
import { TbRadar2 } from "react-icons/tb";
import { SiStorybook } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { SiVite } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaGit } from "react-icons/fa6";
import { RiVercelLine } from "react-icons/ri";
import { RiNodejsLine } from "react-icons/ri";
import { SiPostgresql } from "react-icons/si";
import { TbBlob } from "react-icons/tb";

const skills = [
  { label: 'JavaScript', icon: <BiLogoJavascript size={24}/> },
  { label: 'TypeScript', icon: <BiLogoTypescript size={24}/> },
  { label: 'React', icon: <FaReact size={24}/> },
  { label: 'Vite', icon: <SiVite size={24}/> },
  { label: 'Tailwind CSS', icon: <RiTailwindCssFill size={24}/> },
  { label: 'Next.js', icon: <RiNextjsFill size={24}/> },
  { label: 'Git', icon: <FaGit size={24}/> },
  { label: 'GitHub', icon: <FaGithub size={24}/> },
  { label: 'Storybook', icon: <SiStorybook size={24}/> },
  { label: 'Strapi', icon: <SiStrapi size={24}/> },
  { label: 'Vercel', icon: <RiVercelLine size={24}/> },
  { label: 'Vercel Blob', icon: <TbBlob size={24}/> },
  { label: 'Node.js', icon: <RiNodejsLine size={24}/> },
  { label: 'PostgreSQL', icon: <SiPostgresql size={24}/> },
];

export default function Sidebar() {

    const mailTo = () => {window.location.href = 'mailto:a.romeracosta@gmail.com'}

  return (
    <div className='w-full flex flex-col gap-y-4'>
        <img src='/azeriand.png' alt="Azeriand Logo" className='card w-full rounded-xl'/>
        <Card noPadding appearance='mate' color='red' intensity={200} className='flex flex-col gap-y-3 p-6 xl:p-10 rounded-xl'>
            <section>
                <p style={{color: 'var(--text-red)', textShadow: '0 1px 2px rgba(0,0,0,0.2)'}} className='text-2xl! xl:text-[1.9rem]! font-extrabold! break-words'>Andrea Romera</p>
                <p style={{color: 'var(--text-role)'}} className='text-lg! xl:text-[1.25rem]! font-semibold!'>Frontend Developer</p>
            </section>
            <div className='flex p-2 text-sm text-black font-bold justify-center items-center gap-x-2 bg-green-100 border! border-green-200! rounded-lg'>
                <TbRadar2 size={18} className='shrink-0'/>
                <p>Available for new projects</p> 
            </div>
        </Card>
        
        <Card appearance='outlined' color='red' intensity={300} style={{ color: '#f59e31'}} className='flex flex-col gap-y-3 w-full h-fit rounded-xl'>
            <p className='font-bold' style={{ color: 'black' }}>Want to talk?</p>
            <p style={{ color: 'black' }} className='text-sm'>Feel free to check my resume and reach out for questions or just a friendly chat!</p>
            <section className='flex flex-row flex-wrap gap-2'>
                <Button appearance='mate' size='sm' color='red' intensity={200} icon={<FaEnvelope/>} label="Contact me!" style={{ color: 'black', padding: '0.75rem 1rem' }} className='font-bold whitespace-nowrap' onClick={mailTo}/>
            </section>
        </Card>
        
        <section aria-label='Technologies I work with' className='flex flex-wrap justify-center w-full h-fit gap-2'>
            {skills.map(({ label, icon }) => (
                <span key={label} title={label} className='inline-flex'>
                    <Button appearance='mate' color='red' intensity={200} icon={icon} aria-label={label} style={{ color: 'black' }} className='h-10 w-10 shrink-0 rounded-xl'/>
                </span>
            ))}
        </section>

        
    </div>
  );
}