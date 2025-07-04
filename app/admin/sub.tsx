"use client";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore/lite";
import { useState, useEffect, useRef } from "react";
import { data } from "@/firebase/config";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


export const Activities = () => {
  const search = useRef(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [values, setValues] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const stractue = {
    ar: { title: "", article: "" },
    en: { title: "", article: "" },
    id: "NO ID",
    img: "https://imgs.search.brave.com/dEPIc7gWbXaaxQqErNsQBFNtESWVG0_FSUAe031bUaU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/amdpLmRvZS5nb3Yv/aW1hZ2VzL3B1enps/ZS5wbmc",
    latest: false,
  };

  const fetchAct = async () => {
    try {
      const collect = await collection(data, "activities");

      const querrySnap = await getDocs(collect);

      const minData = querrySnap.docs.map((ele) => {
      
        
        const idF = ele.id;

        const vars = { ...ele.data() ,id:idF};
        

        return vars;
      });

      setValues(minData);
      setSearchFilter(minData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e) => {
    const ele = e.target.value;
    const oldVars = values;
    if (!ele) {
      setValues(searchFilter);

      return;
    }

    const filtered = oldVars.filter((item) => {
      return item.id.includes(ele);
    });

    console.log(ele, oldVars, values, filtered);
    setValues(filtered);
  };
  const handleEdit = (ele) => {
    console.log(ele);
    
    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete =async (e)=>{
    try {
        await deleteDoc(doc(data,"activities",e.id))
        setValues(p => p.filter(ele=>ele != e))
        
    } catch (error) {
        console.error(error);
        
    }

  }

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        console.log(selected);
        const coll = collection(data, "activities");

      await addDoc(coll, selected);
        
        setSelected(stractue);
        setShowEdit(false);

        console.log("return");
      } catch (error) {
        console.error(error);
      } finally {
        return;
      }
    }
    try {
      await updateDoc(doc(data, "activities", selected.id), selected);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  const addNew = () => {
    setSelected(stractue);
    setShowEdit(true);
  };

  useEffect(() => {
    fetchAct();
    setIsLoading(false);
    return () => {};
  }, []);

  if (isLoading) {
    return <div className="font-bold text-2xl text-center ">Loading</div>;
  }

  return (
    <div className="my-2">
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto">
        <input
          type="text"
          ref={search.current}
          className="p-2 overflow-x-auto rounded-xl border-2 border-black  w-[90%] flex justify-self-center shadow-md md:w-[50%] max-w-130"
          onChange={(e) => handleSearch(e)}
          placeholder="Search by id"
        />
        <button
          className="bg-gray-300 font-bold rounded-xl p-2  border-black border-2 hover:bg-gray-400 active:scale-102"
          onClick={addNew}
        >
          ADD NEW
        </button>
      </div>

      <div className="p-2 gap-2 flex flex-wrap max-h-[90vh] overflow-h-auto">
        {values && !(values.length == 0) ? (
          values.map((ele,idx) => (
            <div
              key={ele.id+Timestamp.now()+idx}
              className="w-[30%] min-w-35 max-w-[300px] p-2 bg-gray-200 rounded-xl  flex sm:w-[25%] md:w-[20%] lg:w-[15%] flex-col justify-between"
            >
              <div className="w-full">
                <Image
                  src={ele.img}
                  alt="image"
                  width={100}
                  height={100}
                  className="!static rounded-xl w-full"
                />
              </div>
              <h3 className="text-center overflow-x-auto font-bold text-sm sm:text-lg md:text-xl">
                {ele.ar.title}
              </h3>
              <div className="flex justify-evenly py-1 sm:py-2">
                <FaPen
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleEdit(ele)}
                />
                <FaTrash className="sm:text-xl md:text-2xl active:scale-110"  onClick={()=>handleDelete(ele)}/>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No Content to Show</div>
        )}
      </div>
      {showEdit && selected && (
        <div className="bg-gray-100 h-full w-full fixed top-0 left-0 p-2 gap-2 flex flex-col items-center overflow-y-auto ">
          <IoMdClose
            onClick={() => setShowEdit(false)}
            className="text-4xl fixed right-1 top-1"
          />
         
            
          
          <div className="flex justify-self-center w-[80%] py-2 md:w-[60%] lg:w-[40%] ">
            <Image
              src={selected.img}
              alt="no image"
              width={100}
              height={100}
              className="!static w-full"
            />
            
          </div>
           <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
          <h3 className="bg-gray-300 p-2 rounded-lg mx-auto w-[90%] text-center">
            {selected.id}
          </h3>
          <input
            type="text"
            placeholder="new image URL : "
            className="w-[90%] rounded-lg p-2 border-2 border-black"
            defaultValue={selected.img}
            onChange={(e) =>
              setSelected((p) => ({ ...p, img: e.target.value }))
            }
          />

          <div className="text-xl w-1/2 flex justify-between flex-row-reverse">
            <label htmlFor="checkbox">اخيرة</label>
            <input
              type="checkbox"
              id="checkbox"
              className="w-[1.5rem] h-[1.5rem] rounded-xl"
              checked={selected.latest}
              onChange={(e) =>
                setSelected((p) => ({ ...p, latest: e.target.checked }))
              }
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="arabicTitle" className="flex justify-self-end">
              عنوان العربي
            </label>
            <input
              type="text"
              placeholder="عنوان عربي جديد : "
              className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
              id="arabicTitle"
              defaultValue={selected["ar"]["title"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  ar: {
                    title: e.target.value,
                    article: p["ar"]["article"],
                  },
                }))
              }
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <label htmlFor="arabicArticle">مقالة بالعربي </label>
            <textarea
              name="arabic Article"
              id="arabicArticle"
              className="border-2 border-black w-full min-h-[30vh]"
              defaultValue={selected["ar"]["article"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  ar: {
                    title: p["ar"]["title"],
                    article: e.target.value.split("&/"),
                  },
                }))
              }
            ></textarea>
          </div>
          <div className="w-full flex flex-col items-center">
            <label
              htmlFor="EnglishTitle"
              className="flex justify-self-end capitalize"
            >
              {" "}
              english title
            </label>
            <input
              type="text"
              placeholder="Enter the New title : "
              className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
              id="EnglishTitle"
              defaultValue={selected["en"]["title"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  en: {
                    title: e.target.value,
                    article: p["en"]["article"],
                  },
                }))
              }
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <label htmlFor="EnglishArticle">English Article : </label>
            <textarea
              name="English Article"
              id="EnglishArticle"
              className="border-2 border-black w-full min-h-[30vh]"
              defaultValue={selected["en"]["article"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  en: {
                    title: p["en"]["title"],
                    article: e.target.value.split("&/"),
                  },
                }))
              }
            ></textarea>
          </div>

          <button
            onClick={handleSubmitEdit}
            className="w-full p-2 bg-amber-300 active:bg-amber-400"
          >
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
  );
};
//New Line New Life


export const News = () => {
  const search = useRef(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [values, setValues] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const stractue = {
    ar: { title: "", article: "" },
    en: { title: "", article: "" },
    id: "NO ID",
    img: "https://imgs.search.brave.com/dEPIc7gWbXaaxQqErNsQBFNtESWVG0_FSUAe031bUaU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/amdpLmRvZS5nb3Yv/aW1hZ2VzL3B1enps/ZS5wbmc",
    latest: false,
  };

  const fetchAct = async () => {
    try {
      const collect = await collection(data, "news");

      const querrySnap = await getDocs(collect);

      const minData = querrySnap.docs.map((ele) => {
      
        
        const idF = ele.id;

        const vars = { ...ele.data() ,id:idF};
        

        return vars;
      });

      setValues(minData);
      setSearchFilter(minData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e) => {
    const ele = e.target.value;
    const oldVars = values;
    if (!ele) {
      setValues(searchFilter);

      return;
    }

    const filtered = oldVars.filter((item) => {
      return item.id.includes(ele);
    });

    console.log(ele, oldVars, values, filtered);
    setValues(filtered);
  };
  const handleEdit = (ele) => {
    console.log(ele);
    
    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete =async (e)=>{
    try {
        await deleteDoc(doc(data,"news",e.id))
        setValues(p => p.filter(ele=>ele != e))
        
    } catch (error) {
        console.error(error);
        
    }

  }

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        console.log(selected);
        const coll = collection(data, "news");

      await addDoc(coll, selected);
        
        setSelected(stractue);
        setShowEdit(false);

        console.log("return");
      } catch (error) {
        console.error(error);
      } finally {
        return;
      }
    }
    try {
      await updateDoc(doc(data, "news", selected.id), selected);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  const addNew = () => {
    setSelected(stractue);
    setShowEdit(true);
  };

  useEffect(() => {
    fetchAct();
    setIsLoading(false);
    return () => {};
  }, []);

  if (isLoading) {
    return <div className="font-bold text-2xl text-center ">Loading</div>;
  }

  return (
    <div className="my-2">
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto">
        <input
          type="text"
          ref={search.current}
          className="p-2 overflow-x-auto rounded-xl border-2 border-black  w-[90%] flex justify-self-center shadow-md md:w-[50%] max-w-130"
          onChange={(e) => handleSearch(e)}
          placeholder="Search by id"
        />
        <button
          className="bg-gray-300 font-bold rounded-xl p-2  border-black border-2 hover:bg-gray-400 active:scale-102"
          onClick={addNew}
        >
          ADD NEW
        </button>
      </div>

      <div className="p-2 gap-2 flex flex-wrap max-h-[90vh] overflow-h-auto">
        {values && !(values.length == 0) ? (
          values.map((ele,idx) => (
            <div
              key={ele.id+Timestamp.now()+idx}
              className="w-[30%] min-w-35 max-w-[300px] p-2 bg-gray-200 rounded-xl  flex sm:w-[25%] md:w-[20%] lg:w-[15%] flex-col justify-between"
            >
              <div className="w-full">
                <Image
                  src={ele.img}
                  alt="image"
                  width={100}
                  height={100}
                  className="!static rounded-xl w-full"
                />
              </div>
              <h3 className="text-center overflow-x-auto font-bold text-sm sm:text-lg md:text-xl">
                {ele.ar.title}
              </h3>
              <div className="flex justify-evenly py-1 sm:py-2">
                <FaPen
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleEdit(ele)}
                />
                <FaTrash className="sm:text-xl md:text-2xl active:scale-110"  onClick={()=>handleDelete(ele)}/>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No Content to Show</div>
        )}
      </div>
      {showEdit && selected && (
        <div className="bg-gray-100 h-full w-full fixed top-0 left-0 p-2 gap-2 flex flex-col items-center overflow-y-auto ">
          <IoMdClose
            onClick={() => setShowEdit(false)}
            className="text-4xl fixed right-1 top-1"
          />
         
            
          
          <div className="flex justify-self-center w-[80%] py-2 md:w-[60%] lg:w-[40%] ">
            <Image
              src={selected.img}
              alt="no image"
              width={100}
              height={100}
              className="!static w-full"
            />
            
          </div>
           <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
          <h3 className="bg-gray-300 p-2 rounded-lg mx-auto w-[90%] text-center">
            {selected.id}
          </h3>
          <input
            type="text"
            placeholder="new image URL : "
            className="w-[90%] rounded-lg p-2 border-2 border-black"
            defaultValue={selected.img}
            onChange={(e) =>
              setSelected((p) => ({ ...p, img: e.target.value }))
            }
          />

          <div className="text-xl w-1/2 flex justify-between flex-row-reverse">
            <label htmlFor="checkbox">اخيرة</label>
            <input
              type="checkbox"
              id="checkbox"
              className="w-[1.5rem] h-[1.5rem] rounded-xl"
              checked={selected.latest}
              onChange={(e) =>
                setSelected((p) => ({ ...p, latest: e.target.checked }))
              }
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="arabicTitle" className="flex justify-self-end">
              عنوان العربي
            </label>
            <input
              type="text"
              placeholder="عنوان عربي جديد : "
              className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
              id="arabicTitle"
              defaultValue={selected["ar"]["title"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  ar: {
                    title: e.target.value,
                    article: p["ar"]["article"],
                  },
                }))
              }
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <label htmlFor="arabicArticle">مقالة بالعربي </label>
            <textarea
              name="arabic Article"
              id="arabicArticle"
              className="border-2 border-black w-full min-h-[30vh]"
              defaultValue={selected["ar"]["article"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  ar: {
                    title: p["ar"]["title"],
                    article: e.target.value.split("&/"),
                  },
                }))
              }
            ></textarea>
          </div>
          <div className="w-full flex flex-col items-center">
            <label
              htmlFor="EnglishTitle"
              className="flex justify-self-end capitalize"
            >
              {" "}
              english title
            </label>
            <input
              type="text"
              placeholder="Enter the New title : "
              className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
              id="EnglishTitle"
              defaultValue={selected["en"]["title"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  en: {
                    title: e.target.value,
                    article: p["en"]["article"],
                  },
                }))
              }
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <label htmlFor="EnglishArticle">English Article : </label>
            <textarea
              name="English Article"
              id="EnglishArticle"
              className="border-2 border-black w-full min-h-[30vh]"
              defaultValue={selected["en"]["article"]}
              onChange={(e) =>
                setSelected((p) => ({
                  ...p,
                  en: {
                    title: p["en"]["title"],
                    article: e.target.value.split("&/"),
                  },
                }))
              }
            ></textarea>
          </div>

          <button
            onClick={handleSubmitEdit}
            className="w-full p-2 bg-amber-300 active:bg-amber-400"
          >
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
  );
};
//New Line New Life

export const Branches = () => {
  return (
    <div>sub</div>
  )
}

export const Team = () => {
  return (
    <div>sub</div>
  )
}

export const Faq = () => {
  return (
    <div>sub</div>
  )
}

export const Vars = () => {
  return (
    <div>sub</div>
  )
}
