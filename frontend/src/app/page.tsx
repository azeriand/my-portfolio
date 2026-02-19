
"use client";

import Link from "next/link";
import{ useState, useEffect } from "react";
import client from "../../strapi";
import { Card, Button, Badge } from "azeriand-library";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export const dynamic = "force-static";

export default function Home() {

  const [articles, setArticles] = useState<any[]>([]);

  const fetchArticles = async () => {
    const data = await getData();
    console.log(data);
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const fitnessAppPage = () =>{window.open('https://fitness.andrearc.com/')}
  const fitnessAppRepo = () =>{window.open('https://github.com/azeriand/fitness-app')}
  const libraryPage = () =>{window.open('https://library.andrearc.com/')}
  const libraryRepo = () =>{window.open('https://github.com/azeriand/azeriand-library')}

  return (

    <Card noPadding appearance='ghost' className='gap-4 flex flex-col'>
      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <section className="flex justify-between items-center rounded-xl">
          <p className="text-base font-bold" style={{color: '#17A7EE'}}>Featured Project</p>
          <Link href='/projects'>
            <Button appearance="mate" color="blue" intensity={800} label='View all projects'/>
          </Link>
        </section>
        <section className='grid grid-cols-12 gap-x-14'>
          <img src='/fitness_app_preview.png' className='col-span-5 rounded-lg'/>
          <article className='col-span-7 gap-y-4 flex flex-col'>
            <p style={{color: '#17A7EE'}} className='font-bold text-xl'> Fitness Tracker App</p>
            <p style={{ color: 'black'}}>
              A fitness platform that helps users track workouts and progress in a simple, intuitive way.
            </p>
            <div className="flex gap-x-2">
              <Button label="Open" color='blue' intensity={800} icon={<FaArrowUpRightFromSquare/>} style={{color: '#17A7EE'}} onClick={fitnessAppPage}/>
              <Button appearance='ghost' label="Repo" icon={<FaGithub/>} style={{color: '#17A7EE'}} onClick={fitnessAppRepo}/>
            </div>
          </article>
        </section>
      </Card>

      <section className='grid grid-cols-12 gap-x-4'>
        <Card appearance='mate' color="purple" intensity={500} className='col-span-6 rounded-xl gap-y-4 flex flex-col'>
          <p className='text-base font-bold' style={{ color: '#9b8ce9'}}>My Design Library</p>
          <section className='grid grid-cols-12 gap-x-4'>
            <Card color='purple' intensity={800} appearance='mate' className='col-span-6'>
              Aqui van componentes de la libreria cuquitos
            </Card>
            <div className='col-span-6 flex flex-col gap-y-4'>
              <p className='font-bold' style={{ color: '#9b8ce9'}}> Azeriand Library</p>
              <p style={{ color: 'black'}}> 
                A library of reusable, customizable UI components for consistent application interfaces.
              </p>
              <div className="flex gap-x-2">
              <Button label="Open" color='purple' intensity={800} icon={<FaArrowUpRightFromSquare/>} style={{ color: 'white'}} onClick={libraryPage}/>
              <Button appearance='ghost' label="Repo" icon={<FaGithub/>} style={{ color: '#9b8ce9'}} onClick={libraryRepo}/>
            </div>
            </div>
          </section>
        </Card>

        <Card appearance='mate' color='orange' intensity={500} className='col-span-6 rounded-xl gap-y-4 flex flex-col'>
          <section className="flex justify-between items-center">
            <p className="text-base font-bold" style={{color: '#f59e31'}}>My Latest Articles</p>
            <Link href='/articles'>
              <Button appearance="mate" color="orange" intensity={800} label='View all'/>
            </Link>
          </section>
          {articles.map(article => 
            <Card appearance="mate" color="yellow" intensity={500} noPadding key={article.id} className='flex flex-col gap-y-2 p-4 rounded-lg'>
              <Badge appearance='mate' size='sm' color='orange' intensity={800} label={'Design Library'}/>
              <article className='flex flex-col gap-y-1'>
                <h3 style={{ color: 'black'}} className='font-bold'>{article.title}</h3>
                <p style={{ color: 'black'}}>{article.description}</p>
              </article>
            </Card>
          )}
        </Card>
      </section>
    </Card>

  );
}


async function getData() {
  const result = await client.collection('articles').find({populate: '*'});
  const articles = result.data;

  return articles;
}