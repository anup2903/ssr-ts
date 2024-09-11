// pages/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { title } from 'process';
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
  const { id } = context.params || {}; // Assert that params is not undefined
  console.log("dflk");
  
  try {
    
    // Fetch data from the API using the drillId
    const response = await fetch(`https://api.whereuelevate.com/internity/api/v1/drills?drillId=${id}`);
    
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const apiData = await response.json();
    console.log(response);
    
    console.log(apiData[0].drillName);

    // Assuming the API response structure is like:
    // { drillId: string, title: string, description: string, imageUrl: string }
    // const data: Data = {
    //   id:`${id}`,
    //   title: `Title for ${id}`,
    //   description: `Description for ${id}`,
    //   // image: `https://via.placeholder.com/150?text=${id}`
    // };
    const data: Data = {
      id: apiData[0].drillId || "",
      title: apiData[0].drillName,
      description: apiData[0].drillNature,
      image: apiData[0].drillCoverImgUrl || `https://via.placeholder.com/150?text=${id}`, // Fallback if no image URL
    };

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true, // Return a 404 page in case of error
    };
  }
};

const Page: NextPage<PageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        {/* <meta property="og:image" content={data.image} /> */}
        {/* <meta property="og:url"  content={`${siteUrl}/${data.id}`} /> */}
        {/* Add more meta tags as needed */}
      </Head>
      <main>
        <h1>{data.title}</h1>
        {/* <Image
          src={data.image}
          alt={data.title}
          width={150} // specify width
          height={150} // specify height
        /> */}
        <img src={data.image} alt={data.title} width={150} height={150} />
      </main>
    </>
  );
};

export default Page;
