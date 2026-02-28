import client from "../../strapi";
import Homepage from "./components/homepage";
import {ArticleClient} from '@/app/articles/[slug]/article-client';

export async function getData() {
  const result = await client.collection('articles').find({populate: '*'});
  const articles = result.data;
  const maxArticlesShowed = 3
  const lastArticles = articles.slice(articles.length - maxArticlesShowed, articles.length).reverse();
  return lastArticles;
}

export default async function Home() {
  const articles = await getData();

  return <Homepage articles={articles as any} />;
}