"use client"
import {useState,useEffect,useRef } from "react"
import { Activities } from "./sub"
 


const Dashboard = () => {

    const [isLoading,setIsLoading] = useState(true)
    const navRef = useRef([])


     const getRef = (element) => {
        if (navRef.current.includes(element)) return
        navRef.current.filter((ele)=>ele==null)
            
            
        
        navRef.current.push(element) }
  


    useEffect(() => {
        setIsLoading(false)

        return () => {
            
        };
    }, []);

    const handleShow = (e)=>{
        const ele =  e.target
        console.log(navRef);
        
        navRef.current.map((el)=>{
            if(el==null) return
            el.classList.remove("bg-amber-300")
        })
        ele.classList.add("bg-amber-300")

    }
 

    if(isLoading){
        return(
            <div className="mt-5 text-2xl text-center font-bold">Loading...</div>
        )
    }

  return (
    <div className="w-full">
         <nav className="bg-gray-300 px-1 sm:px-2  w-full">
      <ul className="flex justify-evenly w-full h-full flex-wrap">
        <li onClick={(e)=>handleShow(e)} ref={(el,index) => getRef(el)} className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer bg-amber-300`} >الانشطة</li>
        <li onClick={(e)=>handleShow(e)} ref={(el) => getRef(el)} className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}>الاخبار</li>
        <li onClick={(e)=>handleShow(e)} ref={(el) => getRef(el)} className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}>فروع</li>
        <li onClick={(e)=>handleShow(e)} ref={(el) => getRef(el)} className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}>الفريق</li>
        <li onClick={(e)=>handleShow(e)} ref={(el) => getRef(el)} className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}>فروع</li>
        <li onClick={(e)=>handleShow(e)} ref={(el) => getRef(el)} className={`p-1 sm:p-2 text-[1.2rem] font-medium  sm:text-2xl cursor-pointer `}>متغيرات</li>
      </ul>
    </nav>
    <Activities />

    </div>
  )
}

export default Dashboard