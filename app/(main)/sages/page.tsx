"use client";
import { data } from "@/firebase/config";
import { getDocs, collection } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

const Page = () => {
  const t = useTranslations("nav");
  const [isLoading, setIsLoading] = useState(true);
  const [sages, setSages] = useState([]);

  const fetchSages = async () => {
    try {
      const querySnap = collection(data, "team");
      const queryDocs = await getDocs(querySnap);
      const lang = await language();

      const minData = queryDocs.docs.map((doc) => {
        const docData = doc.data();
        const langData = docData[lang];

        return {
          id: doc.id,
          ...docData,
          ...langData,
        };
      });

     
      setSages(minData);
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSages();

    setIsLoading(false);
  }, []);

  if (isLoading) <Loading />;

  return (
<>
{Object.keys(sages).length>0? (
  <div className="w-full flex flex-col gap-4 bg-gray-200">
 <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center py-5">{t("team")}</h3>
 <div className="flex p-2 gap-3  flex-wrap justify-center px-4">
   {sages.map((ele,idx)=>{

  return (
    <div key={ele +idx} className="w-[45%] md:w-[30%]  lg:w-[15%] flex flex-col items-center  p-2 bg-gray-300 rounded-xl">
     
      <Image width={100 } height={100} unoptimized={true} alt="No img" src={ele.img} className="w-full" priority={false}/>
      <h3 className="font-bold"> {ele.title} </h3>
      <p className="text-gray-700  " > {ele.article}</p>

    </div>
  )
 })}
 </div>

  </div>
):(
  <div>

  </div>
)}
 
  </>
  );
};

export default Page;
