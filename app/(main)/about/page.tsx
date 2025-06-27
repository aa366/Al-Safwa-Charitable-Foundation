"use client";
import { getDoc ,doc } from "firebase/firestore/lite"
import { useState,useEffect } from "react";
import {data} from "@/firebase/config"
import { language } from "@/actions/set-language-action";

const Page =  () => {
  const [articles,setArticles] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  let lang;
  
  const fetchAbout = async ()=>{
    try {
      setIsLoading(true)
      const querySnap = await getDoc(doc(data,"pages","about"))
      lang = await language()
      const aboutData = querySnap.data()[lang]
      setArticles(aboutData["article"])
   
      
      
    } catch (error) {
      console.error(error);
      
      
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const handleChangeLanguage = ()=>{
      fetchAbout()
    }
    window.addEventListener("languagechange",handleChangeLanguage)
    return () => {
      window.removeEventListener("languagechange",handleChangeLanguage)
      
    };
  }, []);
  
  useEffect(()=>{
    fetchAbout()
    return ()=>{

    }
  },[])
  if(isLoading){
    return(
      <div className="flex items-center justify-center text-3xl">
       <span>
         Loading ...
       </span>
      </div>
    )
  }

  return (
  <>
  {articles && (
    articles.length > 0 ? (
      <div className=" w-full flex justify-center items-center my-3 gap-2 flex-col text-black  ">
        {articles.map((ele, index) => (
          <p key={`${ele}-${index}`} className="text-center w-fit p-2 bg-gray-200 text-[1rem] sm:text-lg md:text-xl lg:text-2xl sm:w-[90%] md:2-[80%] lg:w-[75%] font-medium rounded-lg">
            {ele}
          </p>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No articles found</p>
    )
  )}
</>
  )
}

export default Page