import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("sports");
  const [text, setText] = useState("");
  const [loading,setLoading] = useState(true);

  const fetchQueryData = async () => {
    let data = await fetch(
      ` http://hn.algolia.com/api/v1/search?query=${query}`
    );
    data = await data.json();
    // console.log(data.hits);
    if (data.hits) {
      setItems(data.hits);
      setLoading(false)
    } else {
      alert('result not found!!')
    }
  };
  useEffect(() => {
    fetchQueryData();
    
  }, [query]);
  return (
    <div className=" min-h-screen bg-blue-950 text-white flex flex-col items-center pt-24   ">
      <div className="search w-5/6 flex justify-center items-center   ">
        <input
          type="text"
          className=" border-none outline-none px-8 py-4 w-4/6   mb-8 text-lg rounded-l-[4rem] placeholder:text-lg text-gray-600 placeholder:text-gray-500 "
          placeholder="search by category..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="px-8 py-[15px] w-1/6 mb-8 rounded-r-[4rem] border text-lg hover:bg-gray-600 " onClick={()=>setQuery(text)}>
          Search
        </button>
      </div>

      <div className="search_container w-4/6">
        {loading ? <div className="spinner"/> : (
          <>
          
        <p className="category py-4 font-bold text-xl">
          {" "}
          Category: {query}
        </p>

        <div className="cards flex flex-col gap-5">
          {items &&
            items.map(({ author, created_at, title, objectID }) => (
              <div className="card bg-white rounded py-4 px-8 text-black border">
                <h2 className="card-title text-[2rem]  font-bold text-gray-700">
                  {title}{" "}
                </h2>
                <div className="flex justify-between text-lg capitalize">
                  <h5 className="text-gray-700  ">by {author}</h5>
                  <Link
                    to={`post/${objectID}`}
                    className="text-blue-900 underline"
                  >
                    read more.
                  </Link>
                </div>
                <p className=" text-lg mt-4 text-gray-400 font-bold">
                  {format(new Date(created_at), "dd MMMM yyyy")}
                </p>
              </div>
            ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
