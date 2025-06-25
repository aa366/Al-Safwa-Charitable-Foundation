
import React from 'react'
import setLanguageValue from "@/actions/set-language-action"
import { useRouter } from 'next/navigation';

const LocaleSwitcher =   () => {
  const router = useRouter()

     const handleChange = (ele)=>{
        setLanguageValue(ele)

  router.refresh();
    }


  return (
   
    <div>
        <select name="" id="" defaultValue={`en` } onChange={(e)=>{handleChange(e.target.value)}} className='border-2 rounded-sm p-1'>
            <option value="en">English</option>
            <option value="ar">عربي</option>
        </select>

    </div>
  )
}

export default LocaleSwitcher