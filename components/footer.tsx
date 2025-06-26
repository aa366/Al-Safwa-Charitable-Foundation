import React from "react";
import {getTranslations} from 'next-intl/server';
import Link from "next/link";
import {
  FaChild,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaInstagram,
  FaBars,
} from "react-icons/fa";
import { FaPhone, FaSackDollar, FaXTwitter } from "react-icons/fa6";
const Footer = async () => {
  const  t = await  getTranslations("footer");
  return (
    <footer className="border-t-[.5rem] border-green-600 mt-5 ">

      <div className="flex flex-col justify-center">

          <div className="md:flex">
          <Link href={`/`} className="w-fit h-fit">
            <img
              src="/logo.png"
              alt="El Safwat"
              className="  w-[100%]  md:w-[80%] "
            />
          </Link>
          <div className="flex flex-col items-center w-full md:text-xl">
            <h3>{t("welcom")}</h3>
            <a href="tel:%20+1%20(646)%20710-0836" className="text-blue-700">+1 (646) 710-0836</a>
            <a href="mailto:saalsa123456@gmail.com" className="text-blue-700">saalsa123456@gmail.com</a>
          </div>
        </div>

        
         <div className="flex justify-around  text-xl mt-2 md:text-2xl lg:text-3xl ">
            <Link
           className="flex justify-between gap-[5%] bg-red-800 text-white p-2 sm:p-3  rounded-xl hover:scale-103 items-center  "
              href={`/volunteering`}
            >
              <h3>  {t("volunteer")} </h3>
              <FaChild className="text-2xl md:text-3xl lg:text-4xl" />
            </Link>

            <Link
            className="flex justify-between gap-[5%] bg-blue-800 text-white p-2 sm:p-3   rounded-xl hover:scale-103 items-center "
              href={`/donation-main`}
            >
              <h3>  {t("donate")} </h3>
              <FaSackDollar className="text-2xl md:text-3xl lg:text-4xl" />
            </Link>
          </div>
        

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3  text-center text-blue-700 capitalize">
          <Link href={`/news`}>
            <li>{t("news")}</li>
          </Link>
          <Link href={`/privacy-policy`}>
            {" "}
            <li>{t("policy")}</li>
          </Link>
          <Link href={`/faq`}>
            {" "}
            <li>{t("freq")}</li>
          </Link>
        </ul>

      
      </div>
     <div>
      
     </div>
      <h3 className="bg-green-800 py-2 text-center text-white font-bold align-baseline">
       {t("mes")}
      </h3>
    </footer>
  );
};

export default Footer;
