import client from "../../strapi";
import Homepage from "./components/homepage";

// Artículos importados del archivo generado durante el build
import articlesData from '../../.cache/articles.json';

async function getData() {
  const result = await client.collection('articles').find({populate: '*'});
  const articles = result.data;
  const maxArticlesShowed = 3
  const lastArticles = articles.slice(articles.length - maxArticlesShowed, articles.length).reverse();

  return lastArticles as any[];
}

export default async function Home() {
  const articles = await getData();

  return <Homepage articles={articles} />;
}