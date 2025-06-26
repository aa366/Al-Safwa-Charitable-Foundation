"use server";

import { cookies } from "next/headers";

 export const language =async ()=>{
return (await cookies()).get("language")?.value?(await cookies()).get("language")?.value:"ar";
 } 


export async function setLanguageValue(value:string) {
    (await cookies()).set("language",value)
    
}