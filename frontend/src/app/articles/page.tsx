'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import {Card, Button, Badge} from 'azeriand-library';
import { BsArrowReturnRight } from "react-icons/bs";

export default function Articles() {

    const [articles, setArticles] = useState<any[]>([]);
    const [articlesFetched, setArticlesFetched] = useState(false);

    const fetchArticles = async () => {
        if (articlesFetched) return;
        
        try {
            const data = await getData();
            console.log("API Response:", data);
            setArticles(data);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            setArticles([]);
        } finally {
            setArticlesFetched(true);
        }
    }

    useEffect(() => {
        fetchArticles();
    }, [articlesFetched]);
    
    const isWideStyle = 'grid grid-cols-12 col-span-8 gap-x-[2rem]';
    const isNarrowStyle = 'grid grid-rows-12 col-span-4 gap-y-[1rem]';
    const isWide = (index: number) => index % 4 === 1 || index % 4 === 2

    return (
        <Card appearance="mate" color="orange" intensity={500} className='grid grid-cols-12 gap-4'>
            {articles.map((article, index) => {

                const imgUrl = article.cover?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${article.cover.url}` : '/default-image.png';
                return(
                    <Card key={article.id} noPadding appearance="mate" color="yellow" intensity={500} className={`h-[19rem] p-[1.5rem] ${isWide(index) ? isWideStyle : isNarrowStyle}`}>
                        <img src={imgUrl} alt={article.title || "Article image"} className={`rounded w-full !h-full object-cover ${isWide(index) ? 'col-span-6' : 'row-span-4'}`}/>
                        <article className={`flex flex-col gap-y-2 ${isWide(index) ? 'col-span-6 justify-center' : 'row-span-8'}`}>
                            <h2 style={{ color: 'black'}} className='font-bold'>{article.title}</h2>
                            <p style={{ color: 'black'}}>{article.description}</p>
                            <Link href={`/articles/${article.slug}`}>
                                <Button label='Read more' size='sm' icon={<BsArrowReturnRight/>} appearance='mate' color='orange' intensity={800}/>
                            </Link>
                        </article>
                    </Card>
                )}
            )}
        </Card>
    )
}

async function getData() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const res = await fetch(`${strapiUrl}/api/articles?populate=*`, {
      next: { revalidate: false },
    });
    
    if (!res.ok) throw new Error('Failed to fetch articles');
    
    const data = await res.json();
    console.log("Fetched Articles:", data.data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}