"use client";

import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore/lite";
import { language } from "@/actions/set-language-action";
import { Timestamp } from "firebase/firestore/lite"; // Don't forget to import Timestamp if you're creating it manually or for type safety

const Page = ({ params }: { params: { slug: string } }) => {
  const [infos, setInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function formatDate(firebaseTimestamp: Timestamp): string {
      if (!firebaseTimestamp || !(firebaseTimestamp instanceof Timestamp)) {
      // If it's null, undefined, or not a Timestamp object, return a default string
      return "Date not available";
    }
    const dateObject: Date = firebaseTimestamp.toDate();

    const day: number = dateObject.getDate();
    const month: number = dateObject.getMonth() + 1;
    const year: number = dateObject.getFullYear();

    const formattedDay: string = day < 10 ? "0" + day : day.toString();
    const formattedMonth: string = month < 10 ? "0" + month : month.toString();

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const fetchSlug = async () => {
    try {
      const { slug } = await params;
      const lang = await language();
      const querySnap = await getDoc(doc(data, "activities", slug));
      const newData = await querySnap.data();
 console.log(slug,lang,querySnap,newData) ;
      const date = formatDate(newData["time"]);
      const filteredData = {
        ...newData,
        ...newData[lang],
        id: slug,
        time: date,
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
        <div className=" flex flex-col md:flex-row md:p-3 md:justify-between">
          {infos["img"] && (
            <img
              src={infos["img"]}
              alt=""
              className="mb-3 md:w-[45vw] lg:w-[40vw] shadow-sm"
            />
          )}

          <div className="w-full">
            <h3 className="text-2xl font-bold text-center sm:text-4xl">
              {infos["title"]}
            </h3>
            <h5 className="text-right pr-5 text-gray-500 sm:text-2xl">
              {infos["time"]}
            </h5>

            <div className="flex flex-col p-2 gap-2">
              {infos["article"].map((text, idx) => (
                <p
                  key={text + idx}
                  className=" p-1 bg-gray-200 rounded-xl text-center sm:text-xl sm:p-[3%] w-full"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl text-center ">Somthing went wrong</div>
      )}
    </>
  );
};

export default Page;
