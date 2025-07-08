"use client";
import Link from "next/link";
import { FaPhone, FaXTwitter } from "react-icons/fa6";
import {
  FaChild,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaInstagram,
  FaBars
} from "react-icons/fa";
import {ModeToggle} from "@/components/ui/togglemode"
import LocaleSwitcher from "@/components/ui/localeSwitcher"
import { useState , useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import {useTranslations} from 'next-intl';
import {data} from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore/lite";
import Image from "next/image";

const Navbar =  () => {
  const [show,setShow] = useState(false)
  const [divShow,setDivShow] = useState("hidden")
  const  t =  useTranslations("nav")
  const [pageData , setPageData] = useState({});

  const handleShow = ()=>{
    if (show == false) {
      setShow(true)
      setDivShow("fixed")

    }else if (show == true) {
      setShow(false)
        setDivShow("hidden")
    }

  }
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
    <nav className={`flex justify-between flex-col w-full overflow-hidden  `}>

      <div className="flex py-2  w-full flex-col md:flex-row justify-between md:justify-evenly  lg:justify-between lg:px-[3%] ">

        <Link href={`/`} >
      
          <Image width={100} height={100} unoptimized={true}  className=" w-[100%] mb-2 md:mb-0 md:w-[40vw] lg:w-[30vw]" alt="El Safwat" src={pageData["logo"] || "/logo.png"}   />
        </Link>

        <div className="flex  sm:flex-row justify-between  ">

         <div className="flex justify-evenly items-center w-full my-2 sm:w-fit sm:gap-3 p-2">
              <FaBars className="text-3xl md:hidden" onClick={handleShow}/>

              <ModeToggle  />

             <LocaleSwitcher />

          </div>

        <div className="flex justify-between  md:items-center w-auto px-1 gap-2 md:px-0  text-md sm:text-2xl  sm:gap-[5%] md:gap-0 p-[2%] sm:w-fit  ">

          <Link  className="flex justify-between flex-col sm:flex-row  gap-[5%] w-fit md:pr-2" href={`tel:${pageData["tel"] && pageData["tel"]}`}>
          
            <div className="p-2 sm:p-3 bg-[#353535] rounded-2xl md:p-2">
              <FaPhone className="text-2xl md:text-3xl   text-white bg-[#353535]  " />
            </div>
          </Link>

          <div className="flex justify-between  text-lg items-center ">
            <Link 
           className="flex justify-between gap-[5%] bg-red-800 text-white  h-fit p-2 sm:p-3   md:p-4 rounded-2xl hover:scale-103 items-center mr-4 lg:mr-0"
              href={`/volunteering`}
            >
              <h3>  {t("volunteer")} </h3>
              <FaChild className="text-2xl " />
            </Link>

          </div>
         
        </div>
        </div>

      </div>
      <div className={` top-0 left-0 w-screen h-screen ${divShow} bg-[rgb(255,255,255,.5)] md:hidden z-3`} onClick={handleShow}></div>

      <div className= {`rounded-r-2xl   justify-between flex-col p-1 pt-0 sm:pt-1 items-center text-center top-0 left-0  h-full w-[55%]  bg-linear-to-t  from-green-900 to-green-600 transition ease-in-out duration-300 fixed ${show?"flex":"hidden"} md:flex md:static  md:h-fit md:w-full overflow-x-auto  md:rounded-none md:flex-row-reverse z-10 overflow-y-auto `}>
       
   <ul className="p-2  justify-between items-baseline  flex capitalize gap-5 md:gap-0 lg:gap-3  text-xl w-full md:w-fit  flex-col md:flex-row   ">

    <li className="text-white font-bold w-full md:w-auto p-1 text-4xl hover:text-red-400 cursor-pointer md:hidden">
       <IoMdClose onClick={handleShow}/>
    </li>

    <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 `}>
            <Link onClick={handleShow} href={`/`}>{t("home")}</Link>
          </li>
        <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl    md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600`}>
            <Link onClick={handleShow} href={`/sages`}>{t("team")}</Link>
          </li>
              <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 hidden`}>
            <Link onClick={handleShow} href={`/community`}>{t("CommunityDevelopment")}</Link>
          </li>
        
      
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 `}>
            <Link onClick={handleShow} href={`/about`}>{t("about")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 `}>
            {" "}
            <Link onClick={handleShow} href={`/news`}> {t("news")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 `}>
            {" "}
            <Link onClick={handleShow} href={`/activities`}> {t("activities")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 `}>
            {" "}
            <Link onClick={handleShow} href={`/branches`}> {t("branches")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  md:text-lg lg:text-[1.3rem] md:bg-linear-to-t rounded-sm  from-green-900 to-green-600 min-w-fit`}>
            {" "}
            <Link onClick={handleShow} href={`/contact-us`}>{t("contact-us")}</Link>
          </li>
              
        </ul>
        <ul className="flex justify-between  p-3 w-full md:w-[20%]">

          <a href={pageData["links"]? pageData["links"]["insta"] : "https://www.instagram.com/"}>
            <li>
              <FaInstagram className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href={pageData["links"]?pageData["links"]["face"] : "https://www.facebook.com/"}>
            <li>
              <FaFacebookF className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href={pageData["links"]?pageData["links"]["tiktok"] : "https://www.tiktok.com/en/"}>
            <li>
              <FaTiktok className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href={pageData["links"]?pageData["links"]["youtube"] : "https://www.youtube.com/"}>
            <li>
              <FaYoutube className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href={pageData["links"]?pageData["links"]["x"] : "https://twitter.com/"}>
            <li>
              <FaXTwitter className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
        </ul>

     
      </div>
    </nav>
  );
};

export default Navbar;
