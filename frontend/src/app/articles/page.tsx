import client from "../../../strapi";
import ArticlesPage from "./components/articlesPage";

async function getData() {
  const result = await client.collection('articles').find({ populate: 'cover' });
  console.log("Fetched Articles:", result.data);
  return result.data;
}

export default async function Articles() {
  const articles = await getData();

  return <ArticlesPage articles={articles as any} />;
}