"use client";

import Link from "next/link";
import { Card, Button, Badge } from "azeriand-library";
import ProjectButtons from "./projectButtons";

export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  category?: {
    name: string;
  };
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
      <h1 className='sr-only'>Andrea Romera — Frontend Developer</h1>
      <Card appearance='mate' color="blue" intensity={500} className='flex flex-col gap-y-4 rounded-xl'>
        <section className="flex justify-between items-center rounded-xl">
          <h2 className="text-base font-bold" style={{color: 'var(--text-blue)'}}>Featured Project</h2>
          <Link href='/projects'>
            <Button appearance="mate" color="blue" intensity={800} label='View all projects'/>
          </Link>
        </section>
        <section className='grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-x-8 lg:gap-x-14 items-center'>
          <img src='/golden_core_preview.webp' width={1200} height={716} className='w-full h-auto sm:col-span-5 rounded-lg object-cover' alt="Golden Core App Preview"/>
          <article className='sm:col-span-7 gap-y-4 flex flex-col min-w-0'>
            <h3 style={{color: 'var(--text-blue)'}} className='font-bold text-xl'> Golden·Core App</h3>
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
          <h2 className='text-base font-bold' style={{ color: 'var(--text-purple)'}}>My Design Library</h2>
          <section className='grid grid-cols-1 gap-4 min-w-0'>
            <img src='/library_preview.webp' className='w-full h-24 sm:h-40! md:h-40! rounded-lg object-cover' alt="Library Preview"/>
            <div className='flex flex-col gap-y-4 min-w-0'>
              <h3 className='font-bold break-words' style={{ color: 'var(--text-purple)'}}>Azeriand Library</h3>
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
            <h2 className="text-base font-bold" style={{color: 'var(--text-orange)'}}>My Latest Articles</h2>
            <Link href='/articles'>
              <Button appearance="mate" color="orange" intensity={800} label='View all'/>
            </Link>
          </section>
          {articles.map(article => 
            <Link href={`/articles/${article.slug}`} key={article.id}>
              <Card appearance="mate" color="yellow" intensity={500} noPadding className='flex flex-col gap-y-2 p-4 rounded-lg'>
                {article.category?.name && (
                  <Badge appearance='mate' size='sm' color='orange' intensity={800} label={article.category.name}/>
                )}
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
