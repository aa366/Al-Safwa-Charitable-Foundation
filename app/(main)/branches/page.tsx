"use client";
import { getDocs, collection } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { language } from "@/actions/set-language-action";
import { TbWorld } from "react-icons/tb";
import { FaPhone } from "react-icons/fa";
import Loading from "@/app/loading";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBranches = async () => {
    try {
      const querySnap = collection(data, "branches");
      const rowData = await getDocs(querySnap);
      const lang = await language();

      const minData = rowData.docs.map((doc) => {
        const docData = doc.data();
        const langData = docData[lang];

        return {
          id: doc.id,
          ...docData,
          ...langData,
        };
      });

      setArticles(minData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBranches();
    setIsLoading(false);
  }, []);

  if (isLoading) <Loading />;
  return (
    <>
      {articles ? (
        <div className="p-3 flex-wrap flex gap-2">
          {articles.map((item, idx) => {
            return (
              <div
                key={item + idx}
                className="flex flex-col  justify-between p-5 gap-3  bg-[#007aff] text-white w-full  text-center md:w-[50%] lg:w-[33%] rounded-xl font-bold"
              >
                <div className="flex flex-row-reverse gap-4 text-xl sm:justify-center md:justify-normal items-center">
                  <TbWorld className="text-4xl" />
                  <div>
                    <h3>{item.title}</h3>
                    <p> {item.text}</p>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-4 text-xl sm:justify-center md:justify-normal">
                  <FaPhone className="text-3xl" />
                  <h3> {item.tel}</h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p> nothing here </p>
      )}
    </>
  );
};

export default Page;
