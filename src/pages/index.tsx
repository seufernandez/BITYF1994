import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

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
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  // TODO
  // console.log(posts);

  return (
    <>
      <Head>
        <title>Bityf94 | Home</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.posts}>
          {postsPagination.results.map(post => (
            <>
              <Link key={post.uid} href={`/posts/${post.uid}`}>
                <a>
                  <h1>{post.data.title}</h1>
                  <p>{post.data.subtitle}</p>
                  <ul>
                    <li>
                      <FiCalendar />
                      {post.first_publication_date}
                    </li>
                    <li>
                      <FiUser />
                      {post.data.author}
                    </li>
                  </ul>
                </a>
              </Link>
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
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.first_publication_date
      ).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: response.next_page,
    results: posts,
  };

  return {
    props: { postsPagination },
  };
};
