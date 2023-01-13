import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"; //dont deconstruct older version 

export const client = sanityClient({
    projectId: 'k6s1nbwx',
    dataset: 'production',
    apiVersion: '2023-01-12',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);