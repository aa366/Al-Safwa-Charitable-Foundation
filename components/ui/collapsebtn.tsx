"use client"
import { Collapse } from 'react-collapse';
import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";

const Collapsebtn = ({text,ques}:{text:string;ques:string}) => {
   if(text== undefined ||ques == undefined){
    text = "hio;luhlasui"
    ques = "ioklsfjhio;as"
   }

     const [isExpanded, setIsExpanded] = useState(false);
  return (
     <div className='w-full transition-all  duration-900 ease-in-out'>
      <button onClick={() => setIsExpanded(!isExpanded)} className={`w-full text-xl p-4 gap-3 bg-blue-200 flex justify-center items-center  ${isExpanded && "bg-blue-300 font-bold !text-2xl"}` }>
       {!isExpanded? <FaBars className='text-2xl'/> : <FaArrowDownLong className='text-2xl'/>} <span>{ques}</span>
      </button>
      <Collapse isOpened={isExpanded}>
        <div className='w-full bg-blue-200 p-2 text-center'>
          {text}
        </div>
      </Collapse>
    </div>
  )
}

export default Collapsebtn