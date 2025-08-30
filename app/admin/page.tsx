"use client"
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/firebase/config"
import {useState,useEffect} from "react"
import Dashboard from "./dashboard";
const Page = () => {
  // login system
    const [isError,setIsError] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const [logged,setLogged] = useState(auth.currentUser !=null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
   setIsLoading(false)
   console.log(auth.currentUser);
   
    }, []);

    const handleLogin = async (e)=>{
      e.preventDefault();
      setIsError(false)
     
      
      try {
        await signInWithEmailAndPassword(auth,email,password)
        setLogged(auth.currentUser!=null)
       
        
      
        

        
      } catch (error) {
        setIsError(true)
        console.error(error);
        

        
      }

    }

    if(isLoading){
      return(
        <div className="text-center text-2xl text-bold mt-5">Loading ...</div>
      )
    }
    
if(!logged){

  
    return (
    <div className="w-full h-screen flex fixed justify-center pt-5 bg-gray-600 text-lg">
      <form className="flex flex-col w-[95%] p-3 rounded-xl h-fit max-w-[400px]  bg-gray-300 items-center gap-4" onSubmit={handleLogin}>
        <h1>تسجيل دخول</h1>
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full justify-between px-1">
            {" "}
            <input type="text" id="user" className="border-2 p-1 rounded-sm border-black scroll-auto" placeholder="Enter Yout Email : "onChange={(e)=>{setEmail(e.target.value);setIsError(false)}}/>
            <label htmlFor="user">البريد</label>
          </div>
          <div className="flex w-full justify-between px-1">
            {" "}
            <input type="text" id="passowrd" className="border-2 p-1 rounded-sm border-black" placeholder="Enter Yout Password : " onChange={(e)=>{setPassword(e.target.value);setIsError(false)}}/>
            <label htmlFor="passowrd" >الباسورد</label>
          </div>
        </div>
        <h3 className={`text-red-700 ${isError?"block":"hidden"}`}>البريد او الباسورد خطا</h3>
        <button
          type="submit"
          
          className="bg-gray-400 p-2 rounded-sm active:scale-105"
        >
          ارسال
        </button>
      </form>
    </div>
  );
}
//dashboard

return(
  <>
   <Dashboard />
  </>
)

};

export default Page;
