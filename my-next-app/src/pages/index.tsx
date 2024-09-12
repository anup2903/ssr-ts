

import React,{ useEffect } from "react";
import Head from "next/head";
export default function Home() {
  const redirectButton = ()=>{
    window.location.href=`https://whereuelevate.com`;
  }
  useEffect(() => {
    setTimeout(() => {
      console.log("redirecting");

      window.location.href = `https://whereuelevate.com`;
    }, 10);
  }, []);
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Where U Elevate: Connecting next-gen innovative workforce with industry"
          data-react-helmet="true"
        />
        <meta property="og:description" content="Find the best suited opportunity to showcase your innovative skills with available jobs, hackathons, industry led open innovation programs and career mentoring under saarthi initiative" data-react-helmet="true"/>
        <meta property="og:image" content="../mainLogo.png"/>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
          alignItems: "center",
          backgroundClip: "white",
          height: "100vh",
        }}
      >
        <h1>Redirecting to https://whereuelevate.com</h1>
        <h1>Click here to redirect :</h1>
        <button
          onClick={redirectButton}
          style={{
            padding: "10px",
            borderRadius: "30px",
            backgroundColor: "grey",
            color: "white",
          }}
        >
          Redirect
        </button>
      </div>
    </>
  );
}
