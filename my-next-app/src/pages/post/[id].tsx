// pages/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';

interface Data {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

interface PageProps {
  data: Data;
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (context) => {
  const { id } = context.params!; // Assert that params is not undefined

  // Static data example
  const data: Data = {
    id,
    title: `Title for ${id}`,
    description: `Description for ${id}`,
    image: `https://via.placeholder.com/150?text=${id}`
  };

  return {
    props: {
      data,
    },
  };
};

const Page: NextPage<PageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.image} />
        {/* <meta property="og:url"  content={`${siteUrl}/${data.id}`} /> */}
        {/* Add more meta tags as needed */}
      </Head>
      <main>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <Image
          src={data.image}
          alt={data.title}
          width={150} // specify width
          height={150} // specify height
        />
        <img src={data.image} alt={data.title} />
      </main>
    </>
  );
};

export default Page;
