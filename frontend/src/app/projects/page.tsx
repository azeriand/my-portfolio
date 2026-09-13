'use client'

import { Card, Button } from 'azeriand-library';
import { FaArrowUpRightFromSquare, FaG } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiStorybook } from "react-icons/si";
import { RiVercelLine } from "react-icons/ri";
import { RiNodejsLine } from "react-icons/ri";
import { SiPostgresql } from "react-icons/si";
import { TbBlob } from "react-icons/tb";

export default function Projects() {

  const goldenCoreAppPage = () => {window.open('https://golden-core.andrearc.com/demo')}
  const goldenCoreAppRepo = () => {window.open('https://github.com/azeriand/golden-core')}
  const fitnessAppPage = () =>{window.open('https://fitness.andrearc.com/')}
  const fitnessAppRepo = () =>{window.open('https://github.com/azeriand/fitness-app')}
  const libraryPage = () =>{window.open('https://library.andrearc.com/')}
  const libraryRepo = () =>{window.open('https://github.com/azeriand/azeriand-library')}
  const portfolioRepo = () =>{window.open('https://github.com/azeriand/my-portfolio')}

  return (
    <div className='grid gap-y-4'>

      <Card appearance='mate' color="blue" intensity={500} className='grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-x-8 items-center rounded-xl'>
        <img src='/golden_core_preview.png' alt='Golden·Core app preview' className='w-full lg:col-span-7 rounded-xl'/>
        <Card appearance='ghost' className='flex flex-col gap-y-4 lg:col-span-5 min-w-0 justify-center'>
          <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Golden·Core</h1>
          <p style={{ color: 'black'}}>
            A premium event photography platform that makes it easy to share, discover, and relive memories in one private designed space.</p>
          <section style={{ color: 'black'}} className='flex flex-wrap gap-2'>
            <IoLogoJavascript size={24}/>
            <FaReact size={24}/>
            <SiVite size={24}/>
            <RiTailwindCssFill size={24}/>
            <FaGithub size={24}/>
            <RiNextjsFill size={24}/>
            <RiVercelLine size={24}/>
            <TbBlob size={24}/>
            <RiNodejsLine size={24}/>
            <SiPostgresql size={24}/>
          </section>
          <section className="flex gap-x-2">
            <Button label="Open" color='blue' intensity={800} icon={<FaArrowUpRightFromSquare/>} style={{color: '#17A7EE'}} onClick={goldenCoreAppPage}/>
            <Button appearance='ghost' color='blue' label="Repo" icon={<FaGithub/>} style={{color: '#17A7EE'}} onClick={goldenCoreAppRepo}/>
          </section>
        </Card>
      </Card>

      <Card appearance='mate' color="blue" intensity={500} className='grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-x-8 items-center rounded-xl'>
        <img src='/fitness_app_preview.png' alt='Fitness App preview' className='w-full lg:col-span-7 rounded-xl'/>
        <Card appearance='ghost' className='flex flex-col gap-y-4 lg:col-span-5 min-w-0 justify-center'>
          <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Fitness App</h1>
          <p style={{ color: 'black'}}>
            A fitness platform that helps users track workouts and progress in a simple, intuitive way.
          </p>
          <section style={{ color: 'black'}} className='flex flex-wrap gap-2'>
            <IoLogoJavascript size={24}/>
            <FaReact size={24}/>
            <SiVite size={24}/>
            <RiTailwindCssFill size={24}/>
            <FaGithub size={24}/>
          </section>
          <section className="flex gap-x-2">
            <Button label="Open" color='blue' intensity={800} icon={<FaArrowUpRightFromSquare/>} style={{color: '#17A7EE'}} onClick={fitnessAppPage}/>
            <Button appearance='ghost' color='blue' label="Repo" icon={<FaGithub/>} style={{color: '#17A7EE'}} onClick={fitnessAppRepo}/>
          </section>
        </Card>
      </Card>


      <Card appearance='mate' color="blue" intensity={500} className='grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-x-8 items-center rounded-xl'>
        <img src='/azeriand_library_preview.png' alt="Azeriand's Library preview" className='w-full lg:col-span-7 rounded-xl'/>
        <Card appearance='ghost' className='flex flex-col gap-y-4 lg:col-span-5 min-w-0 justify-center'>
          <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Azeriand's Library</h1>
          <p style={{ color: 'black'}}>
            A library of reusable, customizable UI components for consistent application interfaces.            
          </p>
          <section style={{ color: 'black'}} className='flex flex-wrap gap-2'>
            <IoLogoJavascript size={24}/>
            <FaReact size={24}/>
            <SiVite size={24}/>
            <RiTailwindCssFill size={24}/>
            <BiLogoTypescript size={24}/>
            <SiStorybook size={24}/>
            <FaGithub size={24}/>
          </section>
          <section className="flex gap-x-2">
            <Button label="Open" color='blue' intensity={800} icon={<FaArrowUpRightFromSquare/>} style={{color: '#17A7EE'}} onClick={libraryPage}/>
            <Button appearance='ghost' label="Repo" icon={<FaGithub/>} style={{color: '#17A7EE'}} onClick={libraryRepo}/>
          </section>
        </Card>
      </Card>

      <Card appearance='mate' color="blue" intensity={500} className='grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-x-8 items-center rounded-xl'>
        <img src='/portfolio_preview.png' alt='Portfolio preview' className='w-full lg:col-span-7 rounded-xl'/>
        <Card appearance='ghost' className='flex flex-col gap-y-4 lg:col-span-5 min-w-0 justify-center'>
          <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Portfolio</h1>
          <p style={{ color: 'black'}}>
            My own web development portfolio where I showcase my projects, technical skills, and experience.
          </p>
          <section style={{ color: 'black'}} className='flex flex-wrap gap-2'>
            <IoLogoJavascript size={24}/>
            <FaReact size={24}/>
            <SiVite size={24}/>
            <RiTailwindCssFill size={24}/>
            <BiLogoTypescript size={24}/>
            <RiNextjsFill size={24}/>
            <FaGithub size={24}/>
          </section>
          <section className="flex gap-x-2">
            <Button appearance='ghost' label="Repo" icon={<FaGithub/>} style={{color: '#17A7EE'}} onClick={portfolioRepo}/>
          </section>
        </Card>
      </Card>

    </div>
  );
}