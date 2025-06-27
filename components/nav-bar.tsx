"use client";
import Link from "next/link";
import { FaPhone, FaSackDollar, FaXTwitter } from "react-icons/fa6";
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
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {useTranslations} from 'next-intl';


const Navbar =  () => {
  const [show,setShow] = useState(false)
  const  t =  useTranslations("nav")

  const handleShow = ()=>{
    if (show == false) {
      setShow(true)

    }else if (show == true) {
      setShow(false)
    }

  }

  


  return (
    <nav className={`flex justify-between flex-col w-full  `}>

      <div className="flex pt-[5%]  w-full flex-col md:flex-row justify-between md:justify-evenly  lg:justify-between lg:px-[3%] md:pt-[3%] ">

        <Link href={`/`} >
          <img src="/logo.png" alt="El Safwat" className="  w-[100%] mb-2 md:mb-0 md:w-[40vw] lg:w-[30vw]" />
        </Link>

        <div className="flex flex-col sm:flex-row justify-between  ">

         <div className="flex justify-evenly items-center w-full my-2 sm:w-fit sm:gap-3 p-2">
              <FaBars className="text-3xl md:hidden" onClick={handleShow}/>

              <ModeToggle  />

             <LocaleSwitcher />

          </div>

        <div className="flex justify-between md:items-center w-[100%] px-5 md:px-0  text-xl  gap-[5%] md:gap-0 p-[2%] sm:w-fit  ">

          <Link className="flex justify-between gap-[5%] w-fit md:pr-2" href="tel:99444">
            <h3 className="flex self-center  md:text-2xl">99444</h3>
            <div className="p-2 bg-[#353535] rounded-2xl md:p-2">
              <FaPhone className="text-3xl md:text-3xl   text-white bg-[#353535]  " />
            </div>
          </Link>

          <div className="flex justify-between  text-lg ">
            <Link
           className="flex justify-between gap-[5%] bg-red-800 text-white p-1 pl-2.5 md:p-2 md:pl-5 rounded-l-2xl hover:scale-103 items-center"
              href={`/volunteering`}
            >
              <h3>  {t("volunteer")} </h3>
              <FaChild className="text-2xl " />
            </Link>

            <Link
              className="flex justify-between gap-[5%] bg-blue-800 text-white p-1 pl-2.5 md:p-2 md:pl-5 rounded-r-2xl hover:scale-103 items-center"
              href={`/donation-main`}
            >
              <h3>  {t("donate")} </h3>
              <FaSackDollar className="text-2xl " />
            </Link>
          </div>
         
        </div>
        </div>
      </div>

      <div className= {`rounded-r-2xl   justify-between flex-col p-1 items-center text-center top-0 left-0  h-screen w-[55%]  bg-linear-to-t  from-green-900 to-green-600 transition ease-in-out duration-300 fixed ${show?"flex":"hidden"} md:flex md:static md:mt-5 md:h-fit md:w-full  md:rounded-none md:flex-row-reverse z-10`}>
       
   <ul className="p-2  justify-between items-baseline  flex capitalize gap-5   text-xl w-full md:w-fit  flex-col md:flex-row md:gap-2   ">

    <li className="text-white font-bold w-full md:w-auto p-1 text-4xl hover:text-red-400 cursor-pointer md:hidden">
       <IoMdClose onClick={handleShow}/>
    </li>

          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  `}>
            <Link href={`/about`}>{t("about")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  `}>
            {" "}
            <Link href={`/news`}> {t("news")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  `}>
            {" "}
            <Link href={`/activities`}> {t("activities")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  `}>
            {" "}
            <Link href={`/branches`}> {t("branches")}</Link>
          </li>
          <li className={` text-white hover:text-red-400 font-bold w-full md:w-auto p-1 text-2xl  min-w-fit`}>
            {" "}
            <Link href={`/contact-us`}>{t("contact-us")}</Link>
          </li>
        </ul>
        <ul className="flex justify-between  p-3 w-full md:w-[20%]">

          <a href="https://www.instagram.com/">
            <li>
              <FaInstagram className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href="https://www.facebook.com/">
            <li>
              <FaFacebookF className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href="https://www.tiktok.com/en/">
            <li>
              <FaTiktok className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href="https://www.youtube.com/">
            <li>
              <FaYoutube className="text-[1.5rem]  hover:text-red-400 text-white cursor-hover " />
            </li>
          </a>
          <a href="https://twitter.com/">
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
