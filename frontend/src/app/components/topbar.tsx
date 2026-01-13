'use client'
import Link from 'next/link';
import { Card, Button, Avatar } from 'azeriand-library';
import { FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Topbar() {

    const myResumeLink = () => {window.open('https://www.youtube.com/watch?v=oHg5SJYRHA0&t=2s')}
    
    return (
        <Card appearance='mate' noPadding color='blue' intensity={700} className='flex justify-between items-center py-2 px-5 rounded-xl'>
            <div className='flex gap-x-8'>
                <Link href='/'><Avatar src="/azeriand.jpg"/></Link>
                <div className='flex gap-x-3'>
                    <Link href='/projects'><Button color='blue' intensity={700} label="Projects" style={{ color: 'black' }}/></Link>
                    <Link href='/library'><Button color='blue' intensity={700} label="Library" style={{ color: 'black' }}/></Link>
                    <Link href='/articles'><Button color='blue' intensity={700} label="Articles" style={{ color: 'black' }}/></Link>
                    <Button color='blue' intensity={700} label="Resume" style={{ color: 'black' }} onClick={myResumeLink}/>
                </div>
            </div>
            <div className='flex gap-x-3 justify-end'>
                <Button appearance='ghost' icon={<FaEnvelope/>} style={{ color: 'black' }}/>
                <Button appearance='ghost' icon={<FaLinkedinIn/>} style={{ color: 'black' }}/>
                <Button appearance='ghost' icon={<FaGithub/>} style={{ color: 'black' }}/>
            </div>

        </Card>
    )
}