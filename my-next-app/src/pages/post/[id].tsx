// pages/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const { id } = context.params || {}; 
  
  try {

    const response1 = await fetch(`https://api.whereuelevate.com/internity/api/v1/drills/${id}`)
    console.log(response1);
    const responseData1 = await response1.json(); // Assuming you need data from the first fetch

// Example: Extracting `drillId` from responseData1
const drillId = responseData1.drillId;
    
    // Fetch data from the API using the drillId
    const response2 = await fetch(`https://api.whereuelevate.com/internity/api/v1/drills?drillId=${drillId}`);
    
    
    if (!response2.ok) {
      throw new Error('Failed to fetch data');
    }

    const apiData = await response2.json();
    console.log(response2);
    
    console.log(apiData[0].drillName);

  
    const data: Data = {
      id: apiData[0].drillId || "",
      title: apiData[0].drillName ,
      description: apiData[0].drillNature,
      image: apiData[0].drillCoverImgUrl || `https://via.placeholder.com/150?text=${id}`, // Fallback if no image URL
    };
    

    return {
      props: {
        data,
      },
      // redirect: {
      //   destination: 'https://whereuelevate.com/drills/cosmocloud-hackathon',
      //   permanent: false, // Use `true` for a permanent redirect (301)
      // }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true, // Return a 404 page in case of error
    };
  }
};

const Page: NextPage<PageProps> = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const redirectButton = ()=>{
    window.location.href=`https://whereuelevate.com/drills/${id}`;
  }
  useEffect(()=>{
    setTimeout(() => {
      console.log("redirecting");

      window.location.href = `https://whereuelevate.com/drills/${id}`;
    }, 10);
  },[])

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.image} />
        {/* <meta property="og:url"  content={`${siteUrl}/${data.id}`} /> */}
        {/* Add more meta tags as needed */}
      </Head>
      <div style={{display:"flex" ,flexDirection:"column",justifyContent:"center" ,margin:"0 auto" ,alignItems:"center",backgroundClip:"white" ,height:"100vh" }}>
        <h1>Redirecting to https://whereuelevate.com/drills/{id}</h1>
        {/* <Image
          src={data.image}
          alt={data.title}
          width={150} // specify width
          height={150} // specify height
        /> */}
        <h1>Click here to redirect :</h1>
        <button onClick={redirectButton} style={{padding:"10px" , borderRadius:"30px" , backgroundColor:"grey",color:"white"}}>Redirect</button>
      </div>
    </>
  );
};

export default Page;
