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

export default function Projects() {

  const fitnessAppPage = () =>{window.open('https://fitness.andrearc.com/')}
  const fitnessAppRepo = () =>{window.open('https://github.com/azeriand/fitness-app')}
  const libraryPage = () =>{window.open('https://library.andrearc.com/')}
  const libraryRepo = () =>{window.open('https://github.com/azeriand/azeriand-library')}
  const portfolioRepo = () =>{window.open('https://github.com/azeriand/my-portfolio')}

  return (
    <Card noPadding appearance='ghost' className='grid gap-y-4'>

      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <Card noPadding appearance='ghost' className='grid grid-cols-12 gap-x-8 items-center'>
          <img src='/fitness_app_preview.png' className='col-span-7 rounded-xl'/>
          <Card appearance='ghost' className='flex flex-col gap-y-4 col-span-5 justify-center'>
            <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Fitness App</h1>
            <p style={{ color: 'black'}}>
              A fitness platform that helps users track workouts and progress in a simple, intuitive way.
            </p>
            <section style={{ color: 'black'}} className='flex gap-x-2'>
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
      </Card>


      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <Card noPadding appearance='ghost' className='grid grid-cols-12 gap-x-8 items-center'>
          <img src='/azeriand_library_preview.png' className='col-span-7 rounded-xl'/>
          <Card appearance='ghost' className='flex flex-col gap-y-4 col-span-5 justify-center'>
            <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Azeriand's Library</h1>
            <p style={{ color: 'black'}}>
              A library of reusable, customizable UI components for consistent application interfaces.            
            </p>
            <section style={{ color: 'black'}} className='flex gap-x-2'>
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
      </Card>

      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <Card noPadding appearance='ghost' className='grid grid-cols-12 gap-x-8 items-center'>
          <img src='/fitness_app_preview.png' className='col-span-7 rounded-xl'/>
          <Card appearance='ghost' className='flex flex-col gap-y-4 col-span-5 justify-center'>
            <h1 style={{ color: 'black'}} className='text-2xl! font-bold'>Portfolio</h1>
            <p style={{ color: 'black'}}>
              My own web development portfolio where I showcase my projects, technical skills, and experience.
            </p>
            <section style={{ color: 'black'}} className='flex gap-x-2'>
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
      </Card>

    </Card>
  );
}