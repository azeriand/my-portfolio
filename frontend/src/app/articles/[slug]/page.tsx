import { ArticleClient } from './article-client';
import client from "../../../../strapi";
interface Article {
    id: number;
    title: string;
    content?: string;
    cover?: string | undefined;
    slug?: string;
    description?: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      next: { revalidate: false },
    })
    
    const data = await res.json();
    
    return data.data.map((article: any) => ({
      slug: article.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params
  const article = await getArticle(slug)
  const lastArticles = await getLastArticles(slug)

  return <ArticleClient article={article} lastArticles={lastArticles} />
}

export async function getArticle(slug: string) {

    let article: Article;

    const res = await fetch(`${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
        next: { revalidate: false },
    })

    const data = await res.json();

    
    console.log("API Response for Article:", data); // Log the API response to check its structure
    if (data.data.length === 0) {
        console.warn("No article found with the given slug."); // Log a warning if no article is found
    } //404 not found.
    
    // Use static uploads in production, Strapi URL in development
    const useStaticImages = process.env.NODE_ENV === 'production';
    
    article = {
        id: data.data[0].id,
        title: data.data[0].title,
        content: data.data[0].blocks[0].body,
        cover: data.data[0].cover?.url 
          ? (useStaticImages 
              ? `/uploads/${data.data[0].cover.url.split('/').pop()}` 
              : `${STRAPI_URL}${data.data[0].cover.url}`)
          : '/default-image.png'
    };
 
  // Pass data to the page via props
  return article;
}

export async function getLastArticles(excludedSlug: string) {
  let lastArticles: Article[] = [];
  const result = await client.collection('articles').find({
  filters: {
    slug: { $ne: excludedSlug },
  },
  populate: '*',
  sort: ['createdAt:desc'], // sort by creation date, newest first
  pagination: {
    start: 0,
    limit: 5,
  },
});
  const fetchedDocuments = result.data;
  const reversedDocuments = fetchedDocuments.reverse();
  
  // Use static uploads in production, Strapi URL in development
  const useStaticImages = process.env.NODE_ENV === 'production';
  
  reversedDocuments.forEach((doc: any) => {
    lastArticles.push({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      slug: doc.slug,
      cover: doc.cover?.url 
        ? (useStaticImages 
            ? `/uploads/${doc.cover.url.split('/').pop()}` 
            : `${STRAPI_URL}${doc.cover.url}`)
        : '/default-image.png'
    });
  });
  
  return lastArticles;
}