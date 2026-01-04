'use client'
import { Card, Button, Avatar } from 'azeriand-library';
import { FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Topbar() {
    return (
        <Card noPadding className='flex justify-between items-center py-2 px-5 rounded-xl'>
            <div className='flex gap-x-8'>
                <Avatar src="/azeriand.jpg"/>
                <div className='flex gap-x-3'>
                    <Button label="Home"/>
                    <Button label="Library"/>
                    <Button label="Posts"/>
                    <Button label="Resume"/>
                </div>
            </div>
            <div className='flex gap-x-3 justify-end'>
                <Button appearance='ghost' icon={<FaEnvelope/>}/>
                <Button appearance='ghost' icon={<FaLinkedinIn/>}/>
                <Button appearance='ghost' icon={<FaGithub/>}/>
            </div>

        </Card>
    )
}