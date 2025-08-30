"use client";
import { useState, useEffect, useRef } from "react";
import { Activities, News, Branches, Team, Faq, About } from "./sub";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navRef = useRef([]);
  const [tab, setTab] = useState({
    activities: null,
    news: null,
    branches: null,
    team: null,
    faq: null,
    about: null,
  });

  const getRef = (element) => {
    if (navRef.current.includes(element)) return;
    navRef.current.filter((ele) => ele == null);

    navRef.current.push(element);
  };

  useEffect(() => {
    setIsLoading(false);
    setTab({
      activities: true,
      news: false,
      branches: false,
      team: false,
      faq: false,
      about: false,
    });

    return () => {};
  }, []);

  const handleShow = (e) => {
    const ele = e.target;
    navRef.current.map((el) => {
      if (el == null) return;
      el.classList.remove("bg-amber-300");
    });
    ele.classList.add("bg-amber-300");

    setTab({
      activities: null,
      news: null,
      branches: null,
      team: null,
      faq: null,
      about: null,
    });

    switch (ele.textContent) {
      case "الانشطة":
        setTab((p) => ({ ...p, activities: true }));

        break;
      case "الاخبار":
        setTab((p) => ({ ...p, news: true }));

        break;
      case "فروع":
        setTab((p) => ({ ...p, branches: true }));
        break;
      case "الفريق":
        setTab((p) => ({ ...p, team: true }));

        break;
      case "الاسئلة":
        setTab((p) => ({ ...p, faq: true }));

        break;
      case "عنا":
        setTab((p) => ({ ...p, about: true }));

        break;
    }
  };

  if (isLoading) {
    return (
      <div className="mt-5 text-2xl text-center font-bold">Loading...</div>
    );
  }

  return (
    <div className="w-full">
      <nav className="bg-gray-300 px-1 sm:px-2  w-full">
        <ul className="flex justify-evenly w-full h-full flex-wrap">
          <li
            onClick={(e) => handleShow(e)}
            ref={getRef}
            className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer bg-amber-300`}
          >
            الانشطة
          </li>
          <li
            onClick={(e) => handleShow(e)}
            ref={getRef}
            className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}
          >
            الاخبار
          </li>
          <li
            onClick={(e) => handleShow(e)}
            ref={getRef}
            className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}
          >
            فروع
          </li>
          <li
            onClick={(e) => handleShow(e)}
            ref={getRef}
            className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}
          >
            الفريق
          </li>
          <li
            onClick={(e) => handleShow(e)}
            ref={getRef}
            className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}
          >
            الاسئلة
          </li>
          <li
            onClick={(e) => handleShow(e)}
            ref={getRef}
            className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}
          >
            عنا
          </li>
        </ul>
      </nav>

      {tab.activities && <Activities />}
      {tab.news && <News />}
      {tab.branches && <Branches />}
      {tab.team && <Team />}
      {tab.faq && <Faq />}
      {tab.about && <About />}
    </div>
  );
};

export default Dashboard;
