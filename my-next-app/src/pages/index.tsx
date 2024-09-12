

import React,{ useEffect } from "react";

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
    <div style={{display:"flex" ,flexDirection:"column",justifyContent:"center" ,margin:"0 auto" ,alignItems:"center",backgroundClip:"white" ,height:"100vh" }}>
        <h1>Redirecting to https://whereuelevate.com</h1>
        <h1>Click here to redirect :</h1>
        <button onClick={redirectButton} style={{padding:"10px" , borderRadius:"30px" , backgroundColor:"grey",color:"white"}}>Redirect</button>
      </div>
  );
}
