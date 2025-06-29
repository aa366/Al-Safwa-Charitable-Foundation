"use client";
import React from "react";
import { FaRegNewspaper } from "react-icons/fa6";
import GridItem from "@/components/ui/gridItem";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { getDocs, collection } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";


import {useTranslations} from 'next-intl';


const Latest = ({titileClass}: { titileClass?: string }) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6" >
          {" "}
         
          {news && news.map((ele)=>( <GridItem key={ele.id} path={"news/"}  img={ele.img} id={ele.id} title={ele.title}/>)) }
          {!news && (<div className="flex justify-center"> 
<FaSpinner  className="text-2xl"/>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Latest;
