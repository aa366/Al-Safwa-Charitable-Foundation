"use client";
import React from 'react'
import {setLanguageValue,language} from "@/actions/set-language-action"
import { useEffect,useState } from 'react';

const LocaleSwitcher =   () => {
 
  const [lang,setLang] = useState("")
    const [isLoading, setIsLoading] = useState(true)

     const handleChange = async (value)=>{
        await setLanguageValue(value)
window.location.reload()

   
  
    }
   
  
    useEffect( () => {
        const fetchLang = async ()=>{
       try {

       setIsLoading(true)
       const currentLang = await language()
       setLang(currentLang)

       } catch (error) {
        console.error(error)
        setLang("ar")
        
       }finally{
        setIsLoading(false)
       }
    }

       fetchLang()
      return () => {
        
      };
    }, [lang]);
  
if(isLoading){
  return(
    <div className='border-2 rounded-sm p-1'>
      Loading...
    </div>
  )
}

  return (
   
    <div>
        <select  defaultValue={lang} onChange={(e)=>{handleChange(e.target.value)}} className='border-2 rounded-sm p-1' disabled={isLoading}>
            <option value="en">English</option>
            <option value="ar">عربي</option>
        </select>

    </div>
  )
}

export default LocaleSwitcher