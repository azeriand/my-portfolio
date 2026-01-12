'use client'
import { Card, Button, Avatar } from 'azeriand-library';
import { FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Topbar() {
    return (
        <Card appearance='mate' noPadding color='blue' intensity={700} className='flex justify-between items-center py-2 px-5 rounded-xl'>
            <div className='flex gap-x-8'>
                <Avatar src="/azeriand.jpg"/>
                <div className='flex gap-x-3'>
                    <Button color='blue' intensity={700} label="Projects" style={{ color: 'black' }}/>
                    <Button color='blue' intensity={700} label="Library" style={{ color: 'black' }}/>
                    <Button color='blue' intensity={700} label="Articles" style={{ color: 'black' }}/>
                    <Button color='blue' intensity={700} label="Resume" style={{ color: 'black' }}/>
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