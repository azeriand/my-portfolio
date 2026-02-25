import { strapi } from '@strapi/client';

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL 
  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}/api` 
  : 'http://localhost:1337/api';

const client = strapi({ baseURL });

export default client;