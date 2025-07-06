"use client";
import React from "react";
import { FiActivity } from "react-icons/fi";
import GridItem from "@/components/ui/gridItem";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { getDocs, collection } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";
import { useTranslations } from "next-intl";
import { CiCircleMore } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Activities = ({ titileClass }: { titileClass?: string }) => {
  const t = useTranslations("activities");
  const [activities, setactivities] = useState([]);
  const  path  = usePathname();
  const isHome = path == "/"
  

  const fetchActivities = async () => {
    try {
    
      
      const querySnap =  collection(data, "activities");
      const activitiesDocs = await getDocs(querySnap);
      const lang = await language();

      const activitiesData = activitiesDocs.docs.map((doc) => {
        const docData = doc.data();
        const langData = docData[lang];

        return {
          id: doc.id,
          ...docData,
          ...langData,
        };
      });
      const filtered = activitiesData.filter(({latest})=>latest) ;
      console.log(filtered);
      if (isHome) setactivities(filtered) 
      if (!isHome)setactivities(activitiesData)
      
      

     
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchActivities();

    return () => {};
  }, []);

  return (
    <div>
      <div
        className={`flex items-center  p-3 bg-gray-300 gap-3 w-full sm:w-[80%] md:w-[50%] lg:w-[30%] sm:rounded-2xl text-3xl justify-self-center my-2 justify-center  ${titileClass}`}
      >
        <FiActivity className="text-4xl" />
        <div>
          <h3 className="text-center font-bold">
            {t("title")} <span className="text-red-700">{t("titleSpan")}</span>
          </h3>
          <p className="text-gray-500 text-xl ">{t("subTitle")}</p>
        </div>
      </div>

      <div className={`${isHome && "overflow-x-auto overflow-y-hidden"} `}>
        <div className={`flex  ${!isHome &&"flex-wrap"} gap-4 pt-6 `}>
          {" "}
          {activities &&
            activities.map((ele) => (
              <GridItem
                key={ele.id}
                path={"activities/"}
                img={ele.img}
                id={ele.id}
                title={ele.title}
              />
            ))}
          {!activities && (
            <div className="flex justify-center">
              <FaSpinner className="text-2xl" />
            </div>
          )}
           {isHome && <div className="relative mx-3 hover:scale-102 transition-transform duration-200 mb-4 w-[40%] md:w-[28%] lg:w-[22%] ">
            <Link href={`activities/`}>
              <CiCircleMore className="w-3/4 h-3/4 flex justify-self-center self-center" />
            </Link>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Activities;
