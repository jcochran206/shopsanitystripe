import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder} from "@sanity/image-url/lib/types/builder";

export const client = SanityClient({
    projectId: 'k6s1nbwx',
    dataset: 'production',
    apiVersion: '2023-01-12',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);