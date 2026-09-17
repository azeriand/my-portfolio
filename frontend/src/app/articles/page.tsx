import type { Metadata } from "next";
import client from "../../../strapi";
import ArticlesPage, { type Article } from "./components/articlesPage";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles and notes on frontend development and design systems.",
};

async function getData() {
  const result = await client.collection('articles').find({ populate: ['cover', 'category'] });
  return result.data;
}

export default async function Articles() {
  const articles = await getData();
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return <ArticlesPage articles={articles as unknown as Article[]} strapiUrl={strapiUrl} />;
}