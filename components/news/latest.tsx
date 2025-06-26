"use client";
import React from "react";
import { FaRegNewspaper } from "react-icons/fa6";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { getDocs, collection } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";


import {useTranslations} from 'next-intl';


const Latest = (titileClass: { titileClass?: string }) => {
  const t = useTranslations("News")
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {

      const querySnap = await collection(data, "news");
      const newsDocs = await getDocs(querySnap);
      const lang = await language()
     
      

       const newsData = newsDocs.docs.map((doc) => {
      const docData = doc.data(); 
      const langData = docData[lang] ; 
      
      return {
        id: doc.id,
        ...docData,      
        ...langData,     
      }});
      
      setNews(newsData);

     
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchNews();

    return () => {};
  }, []);
      const GridItem = ({img, title ,id}) => {

    return (
      <div className="relative mx-3 hover:scale-102 transition-transform duration-200" key={id}>
        <Link href={`/news/${id}`}  >
        
          <img
            src={img}
              alt={title || 'News image'} 
            className="w-full h-full object-cover rounded-xl aspect-[4/3]"
        
          />

          <div className="  bg-white text-black shadow-sm w-[90%]  p-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center truncate">
           {title}
          </div>
         
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div
        className={`flex items-center  p-3 bg-gray-300 gap-3 w-full sm:w-[80%] md:w-[50%] lg:w-[30%] sm:rounded-2xl text-3xl justify-self-center my-2 justify-center ${titileClass}`}
      >
        <FaRegNewspaper className="text-4xl" />
        <div>
          <h3 className="text-center font-bold">
            {t("title")} <span className="text-red-700">{t("titleSpan")}</span>
          </h3>
          <p className="text-gray-500 text-xl ">{t("subTitle")}</p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6" >
          {" "}
         
          {news && news.map((ele)=>( <GridItem key={ele.id} img={ele.img} id={ele.id} title={ele.title}/>)) }
          {!news && (<div className="flex justify-center"> 
<FaSpinner  className="text-2xl"/>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Latest;
