import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import React from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  // postsPagination: PostPagination;
  posts;
}

export default function Home({ posts }) {
  // TODO
  // console.log(posts);

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <>
              <h1>{post.title}</h1>
              <h3>{post.updatedAt}</h3>
              <p>{post.subtitle}</p>
            </>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      pageSize: 100,
    }
  );
  console.log(JSON.stringify(response, null, 2));

  const posts = response.results.map(post => {
    console.log(JSON.stringify(post, null, 2));
    return {
      slug: post.uid,
      title: post.data.title,
      subtitle: post.data.subtitle,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'en-US',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  // console.log(JSON.stringify(posts, null, 2));
  return {
    props: { posts },
  };
};
