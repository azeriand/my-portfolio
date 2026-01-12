'use client'

import { Card } from 'azeriand-library';
export default function Projects() {
  return (
    <Card noPadding appearance='ghost' className='grid gap-y-4'>

      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <p style={{ color: 'black'}}>Fitness App</p>
        <Card noPadding appearance='ghost' className='grid grid-cols-12 gap-x-4 rounded-xl'>
          <img src='/fitness_app_preview.png' className='col-span-7 rounded-xl'/>
          <Card appearance='ghost' className='flex flex-col gap-y-4 col-span-5'>
            <p style={{ color: 'black'}}>
              Descripción del proyecto.
              Tareas destacables / Logros.
            </p>
            <p style={{ color: 'black'}}>
              Stack: HTML, CSS, JavaScript, React, Github...
            </p>
          </Card>

        </Card>
      </Card>


        <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <p style={{ color: 'black'}}>Azeriand's Library</p>
        <Card noPadding appearance='ghost' className='grid grid-cols-12 gap-x-4 rounded-xl'>
          <img src='/fitness_app_preview.png' className='col-span-7 rounded-xl'/>
          <Card appearance='ghost' className='flex flex-col gap-y-4 col-span-5'>
            <p style={{ color: 'black'}}>
              Descripción del proyecto.
              Tareas destacables / Logros.
            </p>
            <p style={{ color: 'black'}}>
              Stack: HTML, CSS, JavaScript, React, Github...
            </p>
          </Card>
        </Card>
      </Card>

    </Card>
  );
}