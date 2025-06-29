"use client";

import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";
import { Timestamp } from "firebase/firestore/lite"; 
import Collapsebtn from "@/components/ui/collapsebtn";

const Page = ({ params }: { params: { slug: string } }) => {
  const [infos, setInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

 

  const fetchSlug = async () => {
    try {
      const { slug } = await params;
      const lang = await language();
      const querySnap = await getDoc(doc(data, "pages", "faq"));
      const newData = await querySnap.data();

 console.log(slug,lang,querySnap,newData) ;
     
      const filteredData = {
        ...newData,
        ...newData[lang],
        id: newData.id
      
       
      };

      setInfos(filteredData);
    } catch (error) {
      console.error(error);
      setInfos("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlug();
    return () => {};
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-self-center text-center text-2xl">
        Loading ...
      </div>
    );
  }

  return (
    <>
      {typeof infos === "object" && !Array.isArray(infos) && infos !== null ? (
       <div className="sm:w-[80vw] flex flex-col items-center justify-self-center gap-4 py-4">
        {infos["data"].map((item,idx)=>(
           <Collapsebtn text={item.ans} ques={item.ques} key={item + idx}  />

        ))
        }
       </div>
               
      ) : (
        <div className="text-3xl text-center ">Somthing went wrong</div>
      )}
    </>
  );
};

export default Page;
