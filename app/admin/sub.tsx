"use client"
import { collection,getDocs,updateDoc,doc } from "firebase/firestore/lite";
import { useState,useEffect ,useRef} from "react";
import { data } from "@/firebase/config";
import Image from "next/image";
import { FaPen ,FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


export const Activities = ()=>{
    const search = useRef(null)
    const [searchFilter,setSearchFilter] = useState(null) 
    const [values,setValues] = useState([])
    const [showEdit,setShowEdit] = useState(false)
    const [selected,setSelected] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
   
        const fetchAct = async ()=>{
            try {
                 const collect = await collection(data,"activities")
                
                const querrySnap = await getDocs(collect)
                 

                const minData = querrySnap.docs.map((ele)=>{
                    const id = ele.id
                    const vars = {id,...ele.data()}

                    return vars
                }
                    )

                setValues(minData)
                setSearchFilter(minData)
              
                
               
                
            } catch (error) {
                console.error(error);
                
            }
          
        }
        const handleSearch = (e)=>{
            const ele = e.target.value
            const oldVars = values
            if (!ele) {
                setValues(searchFilter)
                console.log("out");
                
                return
                
            }


            const filtered = oldVars.filter((item)=>{
                return item.id.includes(ele)
            })

            console.log(ele,oldVars,values,filtered);
            setValues(filtered)

            
        }
        const handleEdit = (ele)=>{
            setSelected(ele)
            setShowEdit(true)
            console.log(ele);
            


        }
        const handleSubmitEdit =async ()=>{
           await updateDoc(doc(data,"activities",selected.id),selected)
           setShowEdit(false)

        }
        
          useEffect(() => {
                fetchAct()
                setIsLoading(false)
                return () => {
                    
                };
            }, []);

        if (isLoading) {
                return (
                    <div className="font-bold text-2xl text-center ">Loading</div>
                )
                
            }

        return (
            <div className="mt-2">
                <input type="text" ref={search.current} className="p-2 overflow-x-auto rounded-xl border-2 border-black  w-[90%] flex justify-self-center shadow-md " onChange={(e)=>handleSearch(e)} placeholder="Search by id" />
                <div className="p-2 gap-2 flex flex-wrap max-h-[60vh] overflow-h-auto">
                    {values ? (
                        values.map((ele)=>(
                            <div key={ele.id} className="w-[40%] max-w-[300px] p-2 bg-gray-200 rounded-xl  flex sm:w-[30%] md:w-[25%] lg:w-[20%] flex-col justify-center">

                                <div className="w-full">
                                     <Image src={ele.img} alt="image" width={100} height={100} className="!static rounded-xl w-full"/>
                                </div>
                                <h3 className="text-center overflow-x-auto font-bold text-sm sm:text-lg md:text-xl">{ele.ar.title}</h3>
                                <div className="flex justify-evenly py-1 sm:py-2">
                                    <FaPen  className="sm:text-xl md:text-2xl active:scale-110" onClick={()=>handleEdit(ele)}/>
                                    <FaTrash className="sm:text-xl md:text-2xl active:scale-110" />

                                </div>

                               
                            </div>
                        ))
                    ):(
                        <div className="text-center p-4">
                            No Content to Show
                        </div>
                    )}
                </div>
                {showEdit && selected && (
                     <div className="bg-white h-full w-full fixed top-0 left-0 p-2 gap-2 flex flex-col items-center overflow-y-auto">
                            <IoMdClose onClick={()=>setShowEdit(false)}   className="text-4xl fixed right-1"/>
                                <div className="flex justify-self-center w-[80%] py-2">
                                    <Image src={selected.img} alt="no image"  width={100} height={100} className="!static w-full" />
                                </div>
                                <h3 className="bg-gray-300 p-2 rounded-lg mx-auto w-[90%] text-center">{selected.id}</h3>
                                <input type="text" placeholder="new image URL : " className="w-[90%] rounded-lg p-2 border-2 border-black" defaultValue={selected.img} onChange={(e)=>setSelected(p=>  ({...p,img:e.target.value}))}/>

                                <div className="text-xl w-1/2 flex justify-between flex-row-reverse">
                                    <label htmlFor="checkbox" >اخيرة</label>
                                    <input type="checkbox" id="checkbox" className="w-[1.5rem] h-[1.5rem] rounded-xl" checked={selected.latest} onChange={(e)=>setSelected(p=>  ({...p,latest:e.target.checked}))}/>

                                      


                                </div>
                                  <div className="w-full flex flex-col items-center">

                                       <label htmlFor="arabicTitle" className="flex justify-self-end">عنوان العربي</label>
                                      <input type="text" placeholder="عنوان عربي جديد : " className="w-[90%] rounded-lg p-2 border-2 border-black text-left" id="arabicTitle" defaultValue={selected["ar"]["title"]} onChange={(e)=>setSelected(p=>  ({...p,ar:{
                                        title:e.target.value,
                                        article:p["ar"]["article"]
                                      }}))}/>
                                       </div>

                                        <div className="w-full flex flex-col items-center">
                                            <label htmlFor="arabicArticle">مقالة بالعربي </label>
                                      <textarea name="arabic Article" id="arabicArticle" className="border-2 border-black w-full min-h-[30vh]" defaultValue={selected["ar"]["article"]} onChange={(e)=>setSelected(p=>  ({...p,ar:{
                                        title:p["ar"]["title"],
                                        article:e.target.value.split("&/")
                                      }}))}>

                                      </textarea>
                                      </div>
                                  <div className="w-full flex flex-col items-center">

                                       <label htmlFor="EnglishTitle" className="flex justify-self-end capitalize"> english title</label>
                                      <input type="text" placeholder="Enter the New title : " className="w-[90%] rounded-lg p-2 border-2 border-black text-left" id="EnglishTitle" defaultValue={selected["en"]["title"]} onChange={(e)=>setSelected(p=>  ({...p,en:{
                                        title:e.target.value,
                                        article:p["en"]["article"]
                                      }}))}/>
                                       </div>

                                        <div className="w-full flex flex-col items-center">
                                            <label htmlFor="EnglishArticle">English Article :   </label>
                                      <textarea name="English Article" id="EnglishArticle" className="border-2 border-black w-full min-h-[30vh]" defaultValue={selected["en"]["article"]} onChange={(e)=>setSelected(p=>  ({...p,en:{
                                        title:p["en"]["title"],
                                        article:e.target.value.split("&/")
                                      }}))}>

                                      </textarea>
                                      </div>

                                      <button onClick={handleSubmitEdit} className="w-full p-2 bg-amber-300 active:bg-amber-400">Submit</button>

                                       
                       </div>
                )}
               

            </div>
        )
    }
    