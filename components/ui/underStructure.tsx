"use client"
import React from 'react'


import { useTranslations } from 'next-intl'
const  UnderStructure = () => {
  const t = useTranslations("stracture")
  console.log(useTranslations("stracture"));
  
  return (
    <div className='h-full w-full flex justify-center items-center'>
        <span className='font-bold text-4xl '>{t("msg")}</span>
        
    </div> 
  )
}

export default UnderStructure