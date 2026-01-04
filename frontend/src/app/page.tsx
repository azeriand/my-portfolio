
"use client";

import React, { useState, useEffect } from "react";
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

  return (
    <Card noPadding appearance='ghost' className='gap-4 flex flex-col'>
      <Card className='flex flex-col gap-y-4 rounded-xl'>
        <section className="flex justify-between items-center rounded-xl">
          <p className="text-lg font-bold">Featured Project</p>
          <Button label='View all projects'/>
        </section>
        <section className='grid grid-cols-12 gap-x-4'>
          <div className='col-span-5'>Aqui va una imagen del proyecto</div>
          <article className='col-span-7 gap-y-4 flex flex-col'>
            <h3> Fitness Tracker App</h3>
            <p> The egiptyans believed...</p>
            <div className="flex gap-x-2">
              <Button label="Open" icon={<FaArrowUpRightFromSquare/>}/>
              <Button label="Repo" icon={<FaGithub/>}/>
            </div>
          </article>
        </section>
      </Card>

      <section className='grid grid-cols-12 gap-x-4'>
        <Card className='col-span-6 rounded-xl gap-y-4 flex flex-col'>
          <p className='text-lg font-bold'>My Design Library</p>
          <section className='grid grid-cols-12 gap-x-4'>
            <Card className='col-span-6'/>
            <div className='col-span-6 flex flex-col gap-y-4'>
              <h3> Hola Pesicola</h3>
              <p> The egiptyans believed that the most significant thing you could do in your live was die.</p>
              <div className="flex gap-x-2">
              <Button label="Open" icon={<FaArrowUpRightFromSquare/>}/>
              <Button label="Repo" icon={<FaGithub/>}/>
            </div>
            </div>
          </section>
        </Card>

        <Card className='col-span-6 rounded-xl gap-y-4 flex flex-col'>
          <section className="flex justify-between items-center">
            <p className="text-lg font-bold">My Latest Articles</p>
            <Button label='View all'/>
          </section>
          {articles.map(article => 
            <Card noPadding key={article.id} className='flex flex-col gap-y-2 p-4 rounded-lg'>
              <Badge size='sm' label={'Design Library'}/>
              <article className='flex flex-col gap-y-1'>
                <h3 className='text-bold'>{article.title}</h3>
                <p>{article.description}</p>
              </article>
            </Card>
          )}
        </Card>
      </section>

    </Card>
  );
}


async function getData() {
  const result = await client.collection('articles').find();
  const articles = result.data;

  return articles;
}