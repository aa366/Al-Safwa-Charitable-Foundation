"use client";
import React from "react";
import { data } from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore/lite";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
const Banner = () => {
  const [imgs, setImgs] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleClick = (v) => {
    if (imgs.length === 0) return;
    if (v === "next") {
      setIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    } else {
      setIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
    }
  };

  const fetchBanner = async () => {
    try {
      const docRef = doc(data, "pages", "vars");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const bannerData = docSnap.data().banner || [];
        setImgs(bannerData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    if (imgs.length <= 1) return;
    const intervalId = setInterval(() => {
      handleClick("next");
    }, 8000);

    return () => clearInterval(intervalId);
  }, [index, imgs]);

  if (loading) return <div>Loading banner...</div>;
  if (imgs.length === 0) return <div>No banner images found</div>;

  return ( 
    <div className="relative shadow-sm hidden sm:block lg:w-8/10 lg:mx-auto">
      <button
        className="absolute top-1/2 -translate-y-1/2   sm:text-3xl bg-white p-1 rounded-lg lg:text-4xl hover:cursor-pointer left-[1%]"
        onClick={() => {
          handleClick("prev");
        }}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-[1%]   sm:text-3xl bg-white p-1 rounded-lg lg:text-4xl hover:cursor-pointer"
        onClick={() => {
          handleClick("next");
        }}
      >
        <FaArrowRight />
      </button>
      <Image width={100} height={100} src={imgs[index]} alt="bannerPhoto"  className="w-full aspect-20/" unoptimized={true} />
    </div>
  );
};

export default Banner;
