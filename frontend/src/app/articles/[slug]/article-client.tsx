'use client';

import { Card } from 'azeriand-library';
import ReactMarkdown from "react-markdown";

interface Article {
    id: number;
    title: string;
    content: string;
    cover: string | undefined;
}

function RichText({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div className="prose space-y-6">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

interface ArticleClientProps {
  article: Article | null;
}

export function ArticleClient({ article }: ArticleClientProps) {
  if (!article) {
    return (
      <Card appearance="mate" color="red" intensity={500} className='justify-center'>
        <h1 style={{ color: 'black' }} className='font-bold text-4xl!'>Article Not Found</h1>
        <p style={{ color: 'black' }} className='text-lg mt-4'>The article you are looking for does not exist.</p>
      </Card>
    );
  }

  return (
    <Card appearance="mate" color="orange" intensity={500} className='justify-center'>
        <img src={article.cover} alt='Article image' className='w-full h-80! object-cover rounded-lg'/>
        <article className='flex flex-col gap-y-4 mt-8 px-4'>
            <h1 style={{ color: 'black' }} className='font-bold text-4xl!'>{article.title}</h1>
            <div style={{ color: 'black' }} className='w-full flex flex-col flex-wrap items-center'>
                <RichText content={article.content}/>
            </div>
        </article>
    </Card>
  )
}
