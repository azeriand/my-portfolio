import { ArticleClient } from './article-client';

interface Article {
    id: number;
    title: string;
    content: string;
    cover: string | undefined;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params
  const article = await getArticle(slug)

  return <ArticleClient article={article} />
}

export async function getArticle(slug: string) {

    let article: Article;

    console.log("Fetching article with ID:", slug); // Log the article ID to ensure it's being received correctly
    const res = await fetch(`http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
        cache: "no-store",
    })

    const data = await res.json();

    
    console.log("API Response for Article:", data); // Log the API response to check its structure
    if (data.data.length === 0) {
        console.warn("No article found with the given slug."); // Log a warning if no article is found
    } //404 not found.
    
    article = {
        id: data.data[0].id,
        title: data.data[0].title,
        content: data.data[0].blocks[0].body,
        cover: data.data[0].cover?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${data.data[0].cover.url}` : '/default-image.png'
    };
 
  // Pass data to the page via props
  return article;
}