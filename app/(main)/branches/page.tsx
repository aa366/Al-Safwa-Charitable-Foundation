"use client";
import { getDoc, doc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { language } from "@/actions/set-language-action";
import { TbWorld } from "react-icons/tb";
import { FaPhone } from "react-icons/fa";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let lang;
  const [currentLang,setCurrentLang] = useState("")

  const fetchAbout = async () => {
    try {
      setIsLoading(true);
      const querySnap = await getDoc(doc(data, "pages", "branches"));
      lang = await language();
      setCurrentLang(lang)
      const aboutData = querySnap.data()[lang];
     

      setArticles(aboutData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
    return () => {};
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-3xl">
        <span>Loading ...</span>
      </div>
    );
  }

  return (
    <>
      {articles ? (
        <div className="p-3 flex-wrap flex">
            {articles.map((item,idx) =>{

                return(
                  <div key={item+idx} className="flex flex-col  justify-between p-5 gap-3  bg-[#007aff] text-white w-full  text-center md:w-[50%] lg:w-[33%] rounded-xl font-bold"> 

                  <div className="flex flex-row-reverse gap-4 text-xl sm:justify-center md:justify-normal items-center">
                    <TbWorld  className="text-4xl"/>
                    <div>
                      <h3>
                          {item.title}
                      </h3>
                      <p> {item.text}</p>
                    </div>

                  </div>
                  <div className="flex flex-row-reverse gap-4 text-xl sm:justify-center md:justify-normal">
                   <FaPhone className="text-3xl"/>
                    <h3> {item.tel}</h3>
                  </div>
                  
                  
                  </div>
                )

           })}
        </div>
      ):(
        <p> nothing here </p>
      )

      }
    </>
  );
};

export default Page;
