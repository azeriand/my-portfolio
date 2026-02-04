'use client'
import Link from 'next/link';
import { Card, Button, Avatar } from 'azeriand-library';
import { FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Topbar() {

    const myResumeLink = () => {window.open('https://www.youtube.com/watch?v=oHg5SJYRHA0&t=2s')}
    const myLibraryLink = () => {window.open('https://library.andrearc.com/')}
    const githubProfile = () => {window.open('https://github.com/azeriand')}
    const linkedinProfile = () => {window.open('https://www.linkedin.com/in/a-romera-costa/')}
    const mailTo = 'mailto: a.romeracosta@gmail.com'
    
    return (
        <Card appearance='mate' noPadding color='blue' intensity={700} className='flex justify-between items-center py-2 px-5 rounded-xl'>
            <div className='flex gap-x-8'>
                <Link href='/'><Avatar src="/azeriand.jpg"/></Link>
                <div className='flex gap-x-3 items-center'>
                    <Link href='/projects'><Button color='blue' intensity={700} label="Projects" style={{ color: 'black' }}/></Link>
                    <Button color='blue' intensity={700} label="Library" style={{ color: 'black' }} onClick={myLibraryLink}/>
                    <Link href='/articles'><Button color='blue' intensity={700} label="Articles" style={{ color: 'black' }}/></Link>
                    <Button color='blue' intensity={700} label="Resume" style={{ color: 'black' }} onClick={myResumeLink}/>
                </div>
            </div>
            <div className='flex gap-x-3 justify-end'>
                <Link href={mailTo}><Button appearance='ghost' icon={<FaEnvelope/>} style={{ color: 'black' }}/></Link>
                <Button appearance='ghost' icon={<FaLinkedinIn/>} style={{ color: 'black' }} onClick={linkedinProfile}/>
                <Button appearance='ghost' icon={<FaGithub/>} style={{ color: 'black' }} onClick={githubProfile}/>
            </div>

        </Card>
    )
}