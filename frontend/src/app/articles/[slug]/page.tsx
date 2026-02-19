'use client'
import { Card, Button } from 'azeriand-library';
import { useEffect, useState } from 'react';
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

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const [article, setArticle] = useState<Article>({
        id: 0,
        title: '404: Not Found :(',
        content: '',
        cover: "/fitness_app_preview.png",
    });
    
    useEffect(() => {
        params.then(({slug}) => {
            console.log("Fetching article with ID:", slug); // Log the article ID to ensure it's being received correctly
            fetch(`http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
                cache: "no-store",
            }).then(res => {
                return res.json();
            }).then(data => {
                console.log("API Response for Article:", data); // Log the API response to check its structure
                if (data.data.length === 0) {
                    console.warn("No article found with the given slug."); // Log a warning if no article is found
                } //404 not found.
                
                setArticle({
                    id: data.data[0].id,
                    title: data.data[0].title,
                    content: data.data[0].blocks[0].body,
                    cover: data.data[0].cover?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${data.data[0].cover.url}` : '/default-image.png'
                });
            })
        })

        
    }, [])

    
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