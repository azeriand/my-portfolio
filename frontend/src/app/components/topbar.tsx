'use client'
import Link from 'next/link';
import { Card, Button, Avatar } from 'azeriand-library';
import { FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


export default function Topbar() {

    const openResume = () => {window.open("/resume_andrea_romera_costa.pdf", "_blank");};
    const myLibraryLink = () => {window.open('https://library.andrearc.com/')}
    const githubProfile = () => {window.open('https://github.com/azeriand')}
    const linkedinProfile = () => {window.open('https://www.linkedin.com/in/a-romera-costa/')}
    const mailTo = 'mailto: a.romeracosta@gmail.com'
    
    return (
        <Card appearance='mate' noPadding color='red' intensity={200} className='flex justify-between items-center py-2 px-5 rounded-xl'>
            <div className='flex gap-x-8'>
                <Link href='/'><Avatar src="/azeriand.jpg"/></Link>
                <div className='flex gap-x-3 items-center'>
                    <Link href='/projects'><Button appearance='ghost' color='red' intensity={600} label="Projects" style={{ color: 'black' }}/></Link>
                    <Link href='/articles'><Button appearance='ghost' color='red' intensity={600} label="Articles" style={{ color: 'black' }}/></Link>
                    <Button color='red' appearance='ghost' intensity={600} label="Library" icon={<FaArrowUpRightFromSquare/>} style={{ color: 'black' }} onClick={myLibraryLink}/>
                    <Button color='red' appearance='ghost' intensity={600} label="Resume" icon={<FaArrowUpRightFromSquare/>} style={{ color: 'black' }} onClick={openResume}/>
                </div>
            </div>
            <div className='flex gap-x-3 justify-end'>
                <Link href={mailTo}><Button appearance='ghost' color='red' intensity={600} icon={<FaEnvelope size={20}/>} style={{ color: 'black' }}/></Link>
                <Button appearance='ghost' color='red' intensity={600} icon={<FaLinkedinIn size={20}/>} style={{ color: 'black' }} onClick={linkedinProfile}/>
                <Button appearance='ghost' color='red' intensity={600} icon={<FaGithub size={20}/>} style={{ color: 'black' }} onClick={githubProfile}/>
            </div>

        </Card>
    )
}