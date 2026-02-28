'use client';

import { Card, Badge } from 'azeriand-library';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";

interface Article {
    id: number;
    title: string;
    content?: string;
    slug?: string;
    cover?: string;
    description?: string;
}

function RichText({ content }: { content?: string }) {
  if (!content) return null;

  return (
    <div className="prose space-y-6">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

interface ArticleClientProps {
  article?: Article | null;
  lastArticles?: Article[];
}

export function ArticleClient({ article, lastArticles }: ArticleClientProps) {
  if (!article) {
    return (
      <Card appearance="mate" color="red" intensity={500} className='justify-center'>
        <h1 style={{ color: 'black' }} className='font-bold text-4xl!'>Article Not Found</h1>
        <p style={{ color: 'black' }} className='text-lg mt-4'>The article you are looking for does not exist.</p>
      </Card>
    );
  }
  console.log("articles array", lastArticles); // Log the article data to ensure it's being passed correctly
  return (
    <Card appearance="mate" color="orange" intensity={500} className='justify-center'>
        <img src={article.cover} alt='Article image' className='w-full h-80! object-cover rounded-lg'/>
        <article className='flex flex-col md:flex-row! gap-4 mt-8 px-4'>
          <div className='basis-2/3'>
            <h1 style={{ color: 'black' }} className='font-bold text-4xl!'>{article.title}</h1>
            <div style={{ color: 'black' }} className='w-full flex flex-col flex-wrap items-center'>
                <RichText content={article.content}/>
            </div>
          </div>
          <div className='basis-1/3'>
            <h2 style={{ color: 'black' }} className='font-bold text-2xl! mb-4'>Related Articles</h2>
            {lastArticles?.map(article => 
              <Link href={`/articles/${article.slug}`} key={article.id}>
                <Card appearance="mate" color="yellow" intensity={500} noPadding key={article.id} className='flex flex-col gap-y-2 p-4 rounded-lg'>
                  <Badge appearance='mate' size='sm' color='orange' intensity={800} label={'Design Library'}/>
                  <article className='flex flex-col gap-y-1'>
                    <h3 style={{ color: 'black'}} className='font-bold'>{article.title}</h3>
                    <p style={{ color: 'black'}}>{article.description}</p>
                  </article>
                </Card>
              </Link>
            )}
          </div>
        </article>
    </Card>
  )
}
