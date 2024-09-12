// pages/[id].tsx
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Data {
  partnerName: string;
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
  console.log(id);
  
  try {

    const response1 = await fetch(`https://api.whereuelevate.com/internity/api/v1/jobs/customurl/${id} `)
    console.log(response1);
    const responseData1 = await response1.json(); 
const jobId = responseData1.jobId;
console.log(jobId);

    
    const response2 = await fetch(
      `https://api.whereuelevate.com/internity/api/v1/jobs/${jobId}`
    );
    
    
    if (!response2.ok) {
      throw new Error('Failed to fetch data');
    }

    const apiData = await response2.json();
    console.log(response2);
    

  
    const data: Data = {
      partnerName: apiData.partnerName ,
      image: apiData.partnerLogoPath || `https://via.placeholder.com/150?text=${id}`, // Fallback if no image URL
    };
    

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true, 
    };
  }
};

const Page: NextPage<PageProps> = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const redirectButton = ()=>{
    window.location.href=`https://whereuelevate.com/jobs/${id}`;
  }
  useEffect(()=>{
    setTimeout(() => {
      console.log("redirecting");

      window.location.href = `https://whereuelevate.com/jobs/${id}`;
    }, 10);
  },[])

  return (
    <>
      <Head>
        <title>{data.partnerName}</title>
        <meta property="og:title" content={data.partnerName} />
        <meta property="og:image" content={data.image} />
      </Head>
      <div style={{display:"flex" ,flexDirection:"column",justifyContent:"center" ,margin:"0 auto" ,alignItems:"center",backgroundClip:"white" ,height:"100vh" }}>
        <h1>Redirecting to https://whereuelevate.com/jobs/{id}</h1>
        <h1>Click here to redirect :</h1>
        <button onClick={redirectButton} style={{padding:"10px" , borderRadius:"30px" , backgroundColor:"grey",color:"white"}}>Redirect</button>
      </div>
    </>
  );
};

export default Page;
