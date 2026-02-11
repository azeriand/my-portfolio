'use client'
import client from "../../../strapi";
import { useEffect, useState } from 'react';
import Link from "next/link";
import {Card, Button, Badge} from 'azeriand-library';
import { BsArrowReturnRight } from "react-icons/bs";

export const dynamic = "force-static";

export default function Articles() {

    const [articles, setArticles] = useState<any[]>([]);

    const fetchArticles = async () => {
        const data = await getData();
        console.log("API Response:", data); // Log the API response
        setArticles(data);
    }

    useEffect(() => {
        fetchArticles();
        console.log(articles)
    }, []);
    
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
  const result = await client.collection('articles').find({ populate: 'cover' }); // Ensure 'cover' is populated
  console.log("Fetched Articles:", result.data); // Log the fetched articles
  return result.data;
}