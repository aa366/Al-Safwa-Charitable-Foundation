"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState , useEffect } from "react";
import {useTranslations} from 'next-intl';
import {data} from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore/lite";

const Footer =  () => {
  const  t =   useTranslations("footer");
    const [pageData , setPageData] = useState({});

        const fetchInfos = async () => {
      try {
        
    
        const querySnap = await getDoc(doc(data, "pages", "statics"));

        const minData = querySnap.data();
       
        setPageData(minData);
        
        
  
      } catch (error) {
        console.error(error);
      } 
    };
      useEffect(() => {
        fetchInfos();
       
      }, []);
  

  return (
    <footer className="border-t-[.5rem] border-green-600  ">

      <div className="flex flex-col justify-center">

          <div className="md:flex md:justify-evenly">
          <Link href={`/`} className="w-fit h-fit md:ml-2">
            <Image
              src={pageData["logo"] || "/logo.png"} 
              alt="El Safwat"
              className="  w-[100%]  md:w-[80%] "
              width={100}
              height={100}
              unoptimized={true}
            />
          </Link>
          <div className="flex flex-col items-center w-full md:text-xl">
            <h3>{t("welcom")}</h3>
            <a href={pageData["tel-us"]?pageData["tel-us"]: "+1 (646) 710-0836"} className="text-blue-700">{pageData["tel-us"]?pageData["tel-us"]: "+1 (646) 710-0836"} </a>
            <a href={pageData["mail"]?pageData["mail"]: "+1 (646) 710-0836"}  className="text-blue-700">{pageData["mail"]?pageData["mail"]: "+1 (646) 710-0836"} </a>
          </div>
        </div>

        
        
        

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3  text-center text-blue-700 capitalize">
          <li>
 <Link href={`/news`}>
           {t("news")}
          </Link>
          </li>

          <li>
  <Link href={`/privacy-policy`}>
            {" "}
           {t("policy")}
          </Link>
          </li>
         
        <li>
 <Link href={`/faq`}>
            {" "}
            {t("freq")}
          </Link>
        </li>
        <li>
   <Link href={`/volunteering`}>
            {" "}
          {t("volunteer")}
          </Link>
        </li>
         
       
        </ul>

      
      </div>
     <div>
      
     </div>
      <h3 className="bg-green-800 py-2 text-center text-white font-bold align-baseline">
       {t("mes")}
      </h3>
    </footer>
  );
};

export default Footer;
