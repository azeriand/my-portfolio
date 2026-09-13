"use client";

import Link from "next/link";
import { Card, Button, Badge } from "azeriand-library";
import ProjectButtons from "./projectButtons";

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
  };
}

interface HomePageProps {
  articles: Article[];
}

export default function HomePage({ articles }: HomePageProps) {
  return (
    <main className='gap-4 flex flex-col min-h-full'>
      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <section className="flex justify-between items-center rounded-xl">
          <p className="text-base font-bold" style={{color: '#17A7EE'}}>Featured Project</p>
          <Link href='/projects'>
            <Button appearance="mate" color="blue" intensity={800} label='View all projects'/>
          </Link>
        </section>
        <section className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-x-8 lg:gap-x-14 items-center'>
          <img src='/golden_core_preview.png' className='w-full sm:col-span-5 rounded-lg object-cover' alt="Golden Core App Preview"/>
          <article className='sm:col-span-7 gap-y-4 flex flex-col min-w-0'>
            <p style={{color: '#17A7EE'}} className='font-bold text-xl'> Golden·Core App</p>
            <p style={{ color: 'black'}}>
              A premium event photography platform that makes it easy to share, discover, and relive memories in one private designed space.
            </p>
            <ProjectButtons 
              pageUrl="https://golden-core.andrearc.com/demo" 
              repoUrl="https://github.com/azeriand/golden-core" 
              color="blue"
            />
          </article>
        </section>
      </Card>

      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card appearance='mate' color="purple" intensity={500} className='rounded-xl gap-y-4 flex flex-col min-w-0'>
          <p className='text-base font-bold' style={{ color: '#9b8ce9'}}>My Design Library</p>
          <section className='grid grid-cols-1 gap-4 min-w-0'>
            <img src='/library_preview.png' className='w-full h-24 sm:h-40! md:h-40! rounded-lg object-cover' alt="Library Preview"/>
            <div className='flex flex-col gap-y-4 min-w-0'>
              <p className='font-bold break-words' style={{ color: '#9b8ce9'}}>Azeriand Library</p>
              <p className='break-words' style={{ color: 'black'}}>
                A library of reusable, customizable UI components for consistent application interfaces.
              </p>
              <ProjectButtons 
                pageUrl="https://library.andrearc.com/" 
                repoUrl="https://github.com/azeriand/azeriand-library" 
                color="purple"
              />
            </div>
          </section>
        </Card>

        <Card appearance='mate' color='orange' intensity={500} className='rounded-xl gap-y-4 flex flex-col min-w-0'>
          <section className="flex justify-between items-center">
            <p className="text-base font-bold" style={{color: '#f59e31'}}>My Latest Articles</p>
            <Link href='/articles'>
              <Button appearance="mate" color="orange" intensity={800} label='View all'/>
            </Link>
          </section>
          {articles.map(article => 
            <Link href={`/articles/${article.slug}`} key={article.id}>
              <Card appearance="mate" color="yellow" intensity={500} noPadding className='flex flex-col gap-y-2 p-4 rounded-lg'>
                <Badge appearance='mate' size='sm' color='orange' intensity={800} label={'Design Library'}/>
                <article className='flex flex-col gap-y-1'>
                  <h3 style={{ color: 'black'}} className='font-bold'>{article.title}</h3>
                  <p style={{ color: 'black'}}>{article.description}</p>
                </article>
              </Card>
            </Link>
          )}
        </Card>
      </section>
    </main>
  );
}
