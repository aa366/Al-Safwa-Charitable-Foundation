"use client";
import { getDoc, doc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { data } from "@/firebase/config";
import { language } from "@/actions/set-language-action";
import { FiClock } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";


const Page = () => {
  const [articles, setArticles] = useState([]);

  const [email, setEmail] = useState(null);
 
  const [currentLang, setCurrentLang] = useState("");

  const fetchAbout = async () => {
    try {
      
  
      const querySnap = await getDoc(doc(data, "pages", "contact-us"));
      const lang = await language();
   
      
      setCurrentLang(lang);

      const aboutData = querySnap.data()[lang];
    
      
      const mail = querySnap.data()["email"];
  
      

      

      setEmail(mail);
      setArticles(aboutData);

    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchAbout();
  
  }, []);





  return (
    <>
      {Object.keys(articles).length >0  ? (
        <div className="py-3 font-bold">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-stretch px-[10%] sm:text-xl  md:px-[3%] text-center text-white">
            <div className="flex items-center justify-center gap-2 p-2  w-auto md:text-xl bg-[#c23331e3] py-4">
              <FiClock className="text-5xl" />
              <div>
                <h3>{articles["workHours"][0]}</h3>
                <p>{articles["workHours"][1]}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-[#3647a7] w-auto md:text-xl ">
              <FaLocationDot className="text-4xl" />
              <div>
                <h3>{articles["mainbranch"][0]}</h3>
                <p>{articles["mainbranch"][1]}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-[#949627] w-auto md:text-xl ">
              <FaPhone className="text-4xl" />
              <div>
                <h3>{articles["hotLine"][0]}</h3>
                <p>{articles["hotLine"][1]}</p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center flex-col p-2 gap-2">
            <h3
              className={`w-fit flex  ${
                currentLang == "ar" && "flex-row-reverse"
              } `}
            >
              {" "}
              <span>{articles["msg"][0]}</span>
              {"   "}
              <a
                href={`mailto:${email && email}`}
                className="font-bold text-blue-700 cursor-pointer"
              >
                {" "}
                {email && email}{" "}
              </a>
            </h3>
            <h3 className="w-fit">{articles["msg"][1]}</h3>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No articles found</p>
      )}
    
    </>
  );
};

export default Page;
