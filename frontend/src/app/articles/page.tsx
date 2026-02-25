import client from "../../../strapi";
import ArticlesPage from "./components/articlesPage";

async function getData() {
  const result = await client.collection('articles').find({ populate: 'cover' });
  console.log("Fetched Articles:", result.data);
  return result.data;
}

export default async function Articles() {
  const articles = await getData();
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return <ArticlesPage articles={articles as any} strapiUrl={strapiUrl} />;
}