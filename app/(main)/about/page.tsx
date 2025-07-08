"use client";
import { getDoc, doc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { language } from "@/actions/set-language-action";
import Loading from "@/app/loading";
import { useTranslations } from "next-intl";
import { FaEye } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { RiFlowerFill } from "react-icons/ri";
import { IoIosFlower } from "react-icons/io";
import { BsFillChatTextFill } from "react-icons/bs";

const Page = () => {
  const [articles, setArticles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("about");

  const fetchAbout = async () => {
    try {
      setIsLoading(true);
      const querySnap = await getDoc(doc(data, "pages", "about"));
      const lang = await language();
      const minData = querySnap.data()[lang];
      setArticles(minData);
      console.log(minData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbout();
    setIsLoading(false);
    return () => {};
  }, []);

  if (isLoading)  {
  return(
    <>
    <Loading />
    </>
  )
  };
  

  return (
    <div>
      <div className=" w-full flex justify-center items-center my-3 gap-2 flex-col text-black  ">
        <h3 className="text-center w-fit p-2 bg-gray-200 text-[2rem] sm:text-xl md:text-2xl lg:text-3xl sm:w-[50%] md:2-[40%] lg:w-[20%] font-medium rounded-lg capitalize border-x-4  border-black flex justify-center gap-2 items-center hover:text-green-800 hover:border-green-800">
          <FaEye className="text-xl sm:text-2xl md:text-3xl" />
          {t("vision")}
        </h3>
        <p className="text-center w-fit p-2 bg-gray-200 text-[1rem] sm:text-lg md:text-xl lg:text-2xl sm:w-[90%] md:2-[80%] lg:w-[75%] font-medium rounded-lg">
          {articles && articles["vision"]}
       
        </p>
      </div>
      <div className=" w-full flex justify-center items-center my-3 gap-2 flex-col text-black  ">
        <h3 className="text-center w-fit p-2 bg-gray-200 text-[2rem] sm:text-xl md:text-2xl lg:text-3xl sm:w-[50%] md:2-[40%] lg:w-[20%] font-medium rounded-lg capitalize border-x-4  border-black flex justify-center gap-2 items-center hover:text-green-800 hover:border-green-800">
            <GoGoal className="text-xl sm:text-2xl md:text-3xl" />
          {t("goals")}
        </h3>
        <p className="text-center w-fit p-2 bg-gray-200 text-[1rem] sm:text-lg md:text-xl lg:text-2xl sm:w-[90%] md:2-[80%] lg:w-[75%] font-medium rounded-lg">
          {articles && articles["goals"]}
         
        </p>
      </div>
      <div className=" w-full flex justify-center items-center my-3 gap-2 flex-col text-black  ">
        <h3 className="text-center w-fit p-2 bg-gray-200 text-[2rem] sm:text-xl md:text-2xl lg:text-3xl sm:w-[50%] md:2-[40%] lg:w-[20%] font-medium rounded-lg capitalize border-x-4  border-black flex justify-center gap-2 items-center hover:text-green-800 hover:border-green-800">
            <IoIosFlower className="text-xl sm:text-2xl md:text-3xl" />

          {t("principles")}
        </h3>
        <p className="text-center w-fit p-2 bg-gray-200 text-[1rem] sm:text-lg md:text-xl lg:text-2xl sm:w-[90%] md:2-[80%] lg:w-[75%] font-medium rounded-lg">
          {articles && articles["principles"]}
       
        </p>
      </div>
      <div className=" w-full flex justify-center items-center my-3 gap-2 flex-col text-black  ">
        <h3 className="text-center w-fit p-2 bg-gray-200 text-[2rem] sm:text-xl md:text-2xl lg:text-3xl sm:w-[50%] md:2-[40%] lg:w-[20%] font-medium rounded-lg capitalize border-x-4  border-black flex justify-center gap-2 items-center hover:text-green-800 hover:border-green-800">
            <RiFlowerFill className="text-xl sm:text-2xl md:text-3xl" />
          {t("values")}
        </h3>
        <p className="text-center w-fit p-2 bg-gray-200 text-[1rem] sm:text-lg md:text-xl lg:text-2xl sm:w-[90%] md:2-[80%] lg:w-[75%] font-medium rounded-lg">
          {articles && articles["values"]}
      </p>
      </div>

      {articles &&
        (articles["article"]?.length > 0 ? (
          <div className=" w-full flex justify-center items-center my-3 gap-2 flex-col text-black  ">
            <h3 className="text-center w-fit p-2 bg-gray-200 text-[2rem] sm:text-xl md:text-2xl lg:text-3xl sm:w-[50%] md:2-[40%] lg:w-[20%] font-medium rounded-lg capitalize border-x-[1rem]  border-green-900 hover:text-green-800 hover:border-green-800 flex justify-center gap-2 items-center ">
                <BsFillChatTextFill className="text-xl sm:text-2xl md:text-3xl" />
          {t("article")}
        </h3>
            {articles["article"].map((ele:string, index:number) => (
              <p
                key={`${ele}-${index}`}
                className="text-center w-fit p-2 bg-gray-200 text-[1rem] sm:text-lg md:text-xl lg:text-2xl sm:w-[90%] md:2-[80%] lg:w-[75%] font-medium rounded-lg"
              >
                {ele}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles found</p>
        ))}
    </div>
  );
};

export default Page;
