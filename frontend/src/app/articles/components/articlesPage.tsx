"use client";

import Link from "next/link";
import { Card, Button } from 'azeriand-library';
import { BsArrowReturnRight } from "react-icons/bs";

export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
  };
}

interface ArticlesPageProps {
  articles: Article[];
  strapiUrl?: string;
}

export default function ArticlesPage({ articles, strapiUrl }: ArticlesPageProps) {
  // Desktop keeps the alternating wide/narrow masonry (lg+). Below lg every card
  // stacks into a single column (image on top, content below) so nothing is cramped.
  // Column progression: 1 (mobile) -> 2 (sm) -> 3 (md) -> alternating masonry (lg+).
  // Below lg every card stacks (image on top, content below). At lg the "wide"
  // cards split into an internal 2-column layout for the masonry look.
  const isWideStyle = 'flex flex-col lg:grid lg:grid-cols-12 lg:items-center lg:col-span-8 gap-4 lg:gap-x-[2rem]';
  const isNarrowStyle = 'flex flex-col lg:col-span-4 gap-4';
  const isWide = (index: number) => index % 4 === 1 || index % 4 === 2;
  
  // Use static uploads in production, Strapi URL in development
  const useStaticImages = process.env.NODE_ENV === 'production';

  return (
    <Card appearance="mate" color="orange" intensity={500} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4'>
      {articles.map((article, index) => {
        const imgUrl = article.cover?.url 
          ? (useStaticImages 
              ? `/uploads/${article.cover.url.split('/').pop()}` 
              : `${strapiUrl}${article.cover.url}`)
          : '/default-image.png';
        
        return (
          <Card 
            key={article.id} 
            noPadding 
            appearance="mate" 
            color="yellow" 
            intensity={500} 
            className={`lg:min-h-[19rem] min-w-0 p-[1.5rem] ${isWide(index) ? isWideStyle : isNarrowStyle}`}
          >
            <img 
              src={imgUrl} 
              alt={article.title || "Article image"} 
              className={`rounded w-full h-32 sm:h-40 object-cover ${isWide(index) ? 'lg:h-full lg:col-span-6' : 'lg:h-40'}`}
            />
            <article className={`flex flex-col gap-y-2 min-w-0 ${isWide(index) ? 'lg:col-span-6 lg:justify-center' : ''}`}>
              <h2 style={{ color: 'black'}} className='font-bold'>{article.title}</h2>
              <p style={{ color: 'black'}}>{article.description}</p>
              <Link href={`/articles/${article.slug}`}>
                <Button 
                  label='Read more' 
                  size='sm' 
                  icon={<BsArrowReturnRight/>} 
                  appearance='mate' 
                  color='orange' 
                  intensity={800}
                />
              </Link>
            </article>
          </Card>
        );
      })}
    </Card>
  );
}
