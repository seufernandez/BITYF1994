import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client('https://bityf1994.prismic.io/api/v2', {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
  return prismic;
}
