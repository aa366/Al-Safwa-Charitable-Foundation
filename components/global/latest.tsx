"use client";
import React from "react";
import { FaRegNewspaper } from "react-icons/fa6";
import GridItem from "@/components/ui/gridItem";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { getDocs, collection } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";
import { CiCircleMore } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";

import { useTranslations } from "next-intl";

const Latest = ({ titileClass }: { titileClass?: string }) => {
  const t = useTranslations("News");
  const [news, setNews] = useState([]);
  const path = usePathname();
  const isHome = path == "/";
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const querySnap = collection(data, "news");
      const newsDocs = await getDocs(querySnap);
      const lang = await language();

      const newsData = newsDocs.docs.map((doc) => {
        const docData = doc.data();
        const langData = docData[lang];

        return {
          id: doc.id,
          ...docData,
          ...langData,
        };
      });

      const filtered = newsData.filter(({ latest }) => latest);
      console.log(filtered);
      if (isHome) setNews(filtered);
      if (!isHome) setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchNews();
    setIsLoading(false);


  }, []);

  if (isLoading) <Loading />;

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

      <div className={`${isHome && "overflow-x-auto overflow-y-hidden"} `}>
        <div className={`flex  ${!isHome && "flex-wrap"} gap-4 pt-6 `}>
          {" "}
          {news &&
            news.map((ele) => (
              <GridItem
                key={ele.id}
                path={"news/"}
                img={ele.img}
                id={ele.id}
                title={ele.title}
              />
            ))}
             {isHome && (
            <div className="relative mx-3 hover:scale-102 transition-transform duration-200 mb-4 w-[40%] md:w-[28%] lg:w-[22%] ">
              <Link href={`news/`}>
                <CiCircleMore className="w-3/4 h-3/4 flex justify-self-center self-center" />
              </Link>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Latest;
