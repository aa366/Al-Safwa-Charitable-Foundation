"use client";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  Timestamp,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import { useState, useEffect, useRef } from "react";
import { data } from "@/firebase/config";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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

        const vars = { ...ele.data(), id: idF };

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

    (ele, oldVars, values, filtered);
    setValues(filtered);
  };
  const handleEdit = (ele) => {
    (ele);

    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete = async (e) => {
    try {
      await deleteDoc(doc(data, "activities", e.id));
      setValues((p) => p.filter((ele) => ele != e));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        (selected);
        const coll = collection(data, "activities");

        await addDoc(coll, selected);

        setSelected(stractue);
        setShowEdit(false);

        ("return");
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
      <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto"
      >
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
          values.map((ele, idx) => (
            <div
              key={ele.id + Timestamp.now() + idx}
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
                <FaTrash
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleDelete(ele)}
                />
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

        const vars = { ...ele.data(), id: idF };

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

    (ele, oldVars, values, filtered);
    setValues(filtered);
  };
  const handleEdit = (ele) => {
    (ele);

    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete = async (e) => {
    try {
      await deleteDoc(doc(data, "news", e.id));
      setValues((p) => p.filter((ele) => ele != e));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        (selected);
        const coll = collection(data, "news");

        await addDoc(coll, selected);

        setSelected(stractue);
        setShowEdit(false);

        ("return");
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
      <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto"
      >
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
          values.map((ele, idx) => (
            <div
              key={ele.id + Timestamp.now() + idx}
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
                <FaTrash
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleDelete(ele)}
                />
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
  const search = useRef(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [values, setValues] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const stractue = {
    ar: { title: "", text: "" },
    en: { title: "", text: "" },
    id: "NO ID",
  };

  const fetchAct = async () => {
    try {
      const collect = collection(data, "branches");

      const querrySnap = await getDocs(collect);

      const minData = querrySnap.docs.map((ele) => {
        const idF = ele.id;

        const vars = { ...ele.data(), id: idF };

        return vars;
      });
      (minData);

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

    setValues(filtered);
  };
  const handleEdit = (ele) => {
    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete = async (e) => {
    try {
      await deleteDoc(doc(data, "branches", e.id));
      setValues((p) => p.filter((ele) => ele != e));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        (selected);
        const coll = collection(data, "branches");

        await addDoc(coll, selected);

        setSelected(stractue);
        setShowEdit(false);
      } catch (error) {
        console.error(error);
      } finally {
        return;
      }
    }
    try {
      await updateDoc(doc(data, "branches", selected.id), selected);
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
      <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto"
      >
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
          values.map((ele, idx) => (
            <div
              key={ele.id + Timestamp.now() + idx}
              className="w-auto min-w-35  p-2 bg-gray-200 rounded-xl  flex  flex-col justify-between"
            >
              <h3 className="text-center overflow-x-auto font-bold text-sm sm:text-lg md:text-xl">
                {ele.ar.title}
              </h3>
              <h3 className="text-center overflow-x-auto font-bold text-sm sm:text-lg md:text-xl">
                {ele.ar.text}
              </h3>
              <div className="flex justify-evenly py-1 sm:py-2">
                <FaPen
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleEdit(ele)}
                />
                <FaTrash
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleDelete(ele)}
                />
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

          <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
            <h3 className="bg-gray-300 p-2 rounded-lg mx-auto w-[90%] text-center">
              {selected.id}
            </h3>

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
                      ...p["ar"],
                      title: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <label
                htmlFor="Arabictel"
                className="flex justify-self-end capitalize"
              >
                {" "}
                تلفون بالعربي
              </label>
              <input
                type="text"
                placeholder="Enter the New Tel : "
                className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
                id="Arabictel"
                defaultValue={selected["ar"]["tel"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    ar: {
                      ...p["ar"],
                      tel: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <label htmlFor="arabicArticle">عنوان بالعربي </label>
              <textarea
                name="arabic Article"
                id="arabicArticle"
                className="border-2 border-black w-full min-h-[30vh]"
                defaultValue={selected["ar"]["text"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    ar: {
                      ...p["ar"],

                      text: e.target.value,
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
                      ...p["en"],
                      title: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <label
                htmlFor="EnglishTel"
                className="flex justify-self-end capitalize"
              >
                {" "}
                english tel
              </label>
              <input
                type="text"
                placeholder="Enter the New Tel : "
                className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
                id="EnglishTel"
                defaultValue={selected["en"]["tel"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    en: {
                      ...p["en"],
                      tel: e.target.value,
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
                defaultValue={selected["en"]["text"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    en: {
                      ...p["en"],
                      text: e.target.value,
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

export const Team = () => {
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
  };

  const fetchAct = async () => {
    try {
      const collect = await collection(data, "team");

      const querrySnap = await getDocs(collect);

      const minData = querrySnap.docs.map((ele) => {
        const idF = ele.id;

        const vars = { ...ele.data(), id: idF };

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

    (ele, oldVars, values, filtered);
    setValues(filtered);
  };
  const handleEdit = (ele) => {
    (ele);

    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete = async (e) => {
    try {
      await deleteDoc(doc(data, "team", e.id));
      setValues((p) => p.filter((ele) => ele != e));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        (selected);
        const coll = collection(data, "team");

        await addDoc(coll, selected);

        setSelected(stractue);
        setShowEdit(false);

        ("return");
      } catch (error) {
        console.error(error);
      } finally {
        return;
      }
    }
    try {
      await updateDoc(doc(data, "team", selected.id), selected);
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
      <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto"
      >
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
          values.map((ele, idx) => (
            <div
              key={ele.id + Timestamp.now() + idx}
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
                <FaTrash
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleDelete(ele)}
                />
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
                      article: e.target.value,
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

export const Faq = () => {
  const search = useRef(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [values, setValues] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const stractue = {
    ar: { ans: "", ques: "" },
    en: { ans: "", ques: "" },
    id: "NO ID",
  };

  const fetchAct = async () => {
    try {
      const collect = collection(data, "faq");

      const querrySnap = await getDocs(collect);

      const minData = querrySnap.docs.map((ele) => {
        const idF = ele.id;

        const vars = { ...ele.data(), id: idF };

        return vars;
      });
      (minData);

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

    setValues(filtered);
  };
  const handleEdit = (ele) => {
    setSelected(ele);
    setShowEdit(true);
  };
  const handleDelete = async (e) => {
    try {
      await deleteDoc(doc(data, "faq", e.id));
      setValues((p) => p.filter((ele) => ele != e));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async () => {
    if (selected.id == "NO ID") {
      try {
        selected.time = Timestamp.now();
        (selected);
        const coll = collection(data, "faq");

        await addDoc(coll, selected);

        setSelected(stractue);
        setShowEdit(false);
      } catch (error) {
        console.error(error);
      } finally {
        return;
      }
    }
    try {
      await updateDoc(doc(data, "faq", selected.id), selected);
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
      <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto"
      >
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
          values.map((ele, idx) => (
            <div
              key={ele.id + Timestamp.now() + idx}
              className="w-auto min-w-35  p-2 bg-gray-200 rounded-xl  flex  flex-col justify-between"
            >
              <h3 className="text-center overflow-x-auto font-bold text-sm sm:text-lg md:text-xl">
                {ele.ar.ques}
              </h3>

              <div className="flex justify-evenly py-1 sm:py-2">
                <FaPen
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleEdit(ele)}
                />
                <FaTrash
                  className="sm:text-xl md:text-2xl active:scale-110"
                  onClick={() => handleDelete(ele)}
                />
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

          <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
            <h3 className="bg-gray-300 p-2 rounded-lg mx-auto w-[90%] text-center">
              {selected.id}
            </h3>

            <div className="w-full flex flex-col items-center">
              <label htmlFor="arabicTitle" className="flex justify-self-end">
                السوال العربي
              </label>
              <input
                type="text"
                placeholder="السوال عربي جديد : "
                className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
                id="arabicTitle"
                defaultValue={selected["ar"]["ques"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    ar: {
                      ...p["ar"],
                      ques: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <label htmlFor="arabicArticle">الاجابة بالعربي </label>
              <textarea
                name="arabic Article"
                id="arabicArticle"
                className="border-2 border-black w-full min-h-[30vh]"
                defaultValue={selected["ar"]["ans"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    ar: {
                      ...p["ar"],

                      ans: e.target.value,
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
                placeholder="Enter the New question : "
                className="w-[90%] rounded-lg p-2 border-2 border-black text-left"
                id="EnglishTitle"
                defaultValue={selected["en"]["ques"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    en: {
                      ...p["en"],
                      ques: e.target.value,
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
                defaultValue={selected["en"]["ans"]}
                onChange={(e) =>
                  setSelected((p) => ({
                    ...p,
                    en: {
                      ...p["en"],
                      ans: e.target.value,
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

export const About = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [banner, setBanner] = useState(null);
  const [bannerCont, setBannerCont] = useState(null);

  const [values, setValues] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAct = async () => {
    try {
      const querrySnap = await getDoc(doc(data, "pages", "about"));
      const minData = querrySnap.data();
      setValues(minData);

      const querrySnapBanner = await getDoc(doc(data, "pages", "vars"));
      const minDataBanner = querrySnapBanner.data();
      setBanner(minDataBanner);

      (minDataBanner);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (value: string) => {
    setSelected({ ...values, v: value });
    setShowEdit(true);
  };
  const handleBanner = () => {
    setBannerCont({ ...banner });

    setShowBanner(true);
  };

  const handleSubmitEdit = async () => {
    const update = { ...selected };

    try {
      await updateDoc(doc(data, "pages", "about"), update);
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      return;
    }
  };

  const handleSubmitBanner = async () => {
    try {
       await updateDoc(doc(data,"pages","vars"),bannerCont)
      setShowBanner(false);
      (bannerCont);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBannerImg = (text: string, url?: string) => {
    const holder = bannerCont.banner;
  
    
    switch (text) {
      
      case "up":   
        const idx = bannerCont.banner.findIndex(item => item === url);
        if (idx <= 0) return;   
        holder[idx] = holder[idx - 1];
        holder[idx - 1] = url;
        

        setBannerCont({ banner: holder });

        break;
        
      case "down":
        const idxD: number = bannerCont.banner.findIndex(item=> item===url);
        if (idxD+1 >=bannerCont.banner.length ) return;
        holder[idxD] = holder[idxD +1];
        holder[idxD + 1] = url;
        setBannerCont({ banner: holder });
        break;

      case "del": 
        const newHolder = holder.filter((s)=>s!=url)
        (newHolder);
        
        setBannerCont({banner:newHolder})
       
        break;
      case "add": 
        setBannerCont(p=> ({...p,banner:[bannerCont.new,...holder]}))
        break;
    }
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
      <div className="p-2 gap-2 flex flex-wrap max-h-[90vh] overflow-h-auto">
        {values ? (
          <div className="flex flex-col w-full gap-2 p-2  items-center">
            <button
              onClick={() => handleEdit("vision")}
              className="p-2 text-lg sm:text-xl md:text-2xl bg-gray-200 hover:bg-gray-300 active:scale-105 w-full   md:w-[50%] py-4  rounded-xl cursor-pointer"
            >
              روية
            </button>
            <button
              onClick={() => handleEdit("goals")}
              className="p-2 text-lg sm:text-xl md:text-2xl bg-gray-200 hover:bg-gray-300 active:scale-105 w-full   md:w-[50%] py-4  rounded-xl cursor-pointer"
            >
              الاهداف
            </button>
            <button
              onClick={() => handleEdit("principles")}
              className="p-2 text-lg sm:text-xl md:text-2xl bg-gray-200 hover:bg-gray-300 active:scale-105 w-full   md:w-[50%] py-4  rounded-xl cursor-pointer"
            >
              المبادئ
            </button>
            <button
              onClick={() => handleEdit("values")}
              className="p-2 text-lg sm:text-xl md:text-2xl bg-gray-200 hover:bg-gray-300 active:scale-105 w-full   md:w-[50%] py-4  rounded-xl cursor-pointer"
            >
              القيم
            </button>
            <button
              onClick={() => handleEdit("article")}
              className="p-2 text-lg sm:text-xl md:text-2xl bg-gray-200 hover:bg-gray-300 active:scale-105 w-full   md:w-[50%] py-4  rounded-xl cursor-pointer"
            >
              الرسالة
            </button>

            <button
              onClick={handleBanner}
              className="p-2 text-lg sm:text-xl md:text-2xl bg-gray-200 hover:bg-gray-300 active:scale-105 w-full   md:w-[50%] py-4  rounded-xl cursor-pointer"
            >
              البانر
            </button>
          </div>
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

          <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
            <h3 className="bg-gray-300 p-2 rounded-lg mx-auto w-[90%] text-center">
              {selected.v}
            </h3>

            <div className="w-full flex flex-col items-center">
              <label htmlFor="arabicArticle">مقالة بالعربي </label>
              <textarea
                name="arabic Article"
                id="arabicArticle"
                className="border-2 border-black w-full min-h-[30vh]"
                defaultValue={
                  selected.v == "article"
                    ? selected.ar.article.join("&/")
                    : selected.ar[selected.v]
                }
                onChange={(e) =>
                  selected.v == "article"
                    ? setSelected((p) => ({
                        ...p,
                        ar: { ...p.ar, article: e.target.value.split("&/") },
                      }))
                    : setSelected((p) => ({
                        ...p,
                        ar: { ...p.ar, [selected.v]: e.target.value },
                      }))
                }
              ></textarea>
            </div>
            <div className="w-full flex flex-col items-center">
              <label htmlFor="EnglishArticle">English Article : </label>
              <textarea
                name="English Article"
                id="EnglishArticle"
                className="border-2 border-black w-full min-h-[30vh]"
                defaultValue={
                  selected.v == "article"
                    ? selected.en.article.join("&/")
                    : selected.en[selected.v]
                }
                onChange={(e) =>
                  selected.v == "article"
                    ? setSelected((p) => ({
                        ...p,
                        en: { ...p.en, article: e.target.value.split("&/") },
                      }))
                    : setSelected((p) => ({
                        ...p,
                        en: { ...p.en, [selected.v]: e.target.value },
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
      {showBanner && bannerCont && (
        <div className="bg-gray-100 h-full w-full fixed top-0 left-0 p-2 gap-2 flex flex-col items-center overflow-y-auto ">
          <IoMdClose
            onClick={() => setShowBanner(false)}
            className="text-4xl fixed right-1 top-1"
          />

          <div className="w-full max-w-[600px] flex flex-col items-center gap-2">
                <div
        className="flex flex-col items-center gap-2 md:flex-row md:justify-center
       md:w-full md:mx-auto"
      >
        <input
          type="text"
          
          className="p-2 overflow-x-auto rounded-xl border-2 border-black  w-[90%] flex justify-self-center shadow-md md:w-[50%] max-w-130"
          onChange={(e) => setBannerCont(p=>({...p,new:e.target.value}))}
          placeholder="Search by id"
        />
        <button
          className="bg-gray-300 font-bold rounded-xl p-2  border-black border-2 hover:bg-gray-400 active:scale-102"
          onClick={()=>handleBannerImg("add")}
        >
          ADD NEW
        </button>
      </div>
            <div className="w-full flex flex-wrap gap-2 ">
              {bannerCont.banner && bannerCont.banner.map((url: string, idx: number) => (
                <div key={url + idx} className="w-full bg-gray-200 p-2 flex select-none ">
                  <div className="w-[90%]">
                    <Image
                      width={100}
                      height={100}
                      unoptimized={true}
                      alt="NO Image"
                      src={url}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col items-center w-[10%] gap-3">
                    <FaArrowUp
                      className="textlg sm:text-xl md:text-2xl "
                      onClick={() => handleBannerImg("up", url)}
                    />
                    <FaArrowDown
                      className="textlg sm:text-xl md:text-2xl "
                      onClick={() => handleBannerImg("down", url)}
                    />
                    <FaTrash
                      className="textlg sm:text-xl md:text-2xl "
                      onClick={() => handleBannerImg("del", url)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitBanner}
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
