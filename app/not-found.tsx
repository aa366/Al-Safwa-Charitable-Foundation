"use client"
import React from 'react'
import Navbar from '@/components/nav-bar'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations("stracture")
  return (
    <div>
      <Navbar />
       <div className='font-bold text-4xl text-center'>{t("404")}</div>
      
    </div>
   
  )
}

export default Page