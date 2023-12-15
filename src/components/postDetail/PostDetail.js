import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const PostDetail = () => {
  const { id } = useParams();

  const [item, setItem] = useState([]);
  const [children,setChildren] = useState([
   {
     author:"",
    created_at: null,
    text:"",
  }, 
  ]) 

  const [loading,setLoading] = useState(true);
  const [err, setErr] =useState(false);

  const fetchChildren=(childrenArr)=>{
     
    childrenArr.forEach(({author,created_at,text,children })=>{
      //  console.log(author,created_at,text)
      setChildren((prev)=>[...prev, {author:author,text:text,created_at:created_at}] )  
     
      if(children){
        fetchChildren(children)
      }
       
  })
    
  }
  
  const fetchData = async () => {
    try{
      let data = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
    data = await data.json();
    setItem(data);
    // console.log(data);
    setLoading(false);
    if(data.children){
      fetchChildren(  data.children);
      // console.log("children ",children);
      
    }
    
  } catch(err){
    console.log("error");
    setLoading(false)
    setErr(true)
    }
    
   
  };
  useEffect(() => {
    fetchData();
   
    
   
  }, [id]);  
  return (
    <div className="min-h-screen py-12 px-20">
      {loading ? <div className="spinner"/> : <>
      {err ? <h2>Some error occur...</h2> : <> 
      <div className="flex justify-between items-center mb-3">
      <p className="title text-[3rem] text-blue-950 font-bold  ">
        {item && item.title}
      </p>
      <Link to="/" className="  bg-blue-950 rounded-3xl border-4 border-blue-900 px-3 py-1 text-white font-bold text-2xl">Go Home</Link>

      </div>
      <div className="auth_data flex items-center justify-between mb-3 ">
        <p className="text-2xl text-gray-500 font-bold ">
         By Author <span className=" text-blue-950 capitalize ">{item.author}</span>
        </p>
        <a
          href={item.url}
          target="_blank"
          className="text-blue-900 text-2xl underline capitalize"
        >
         
          read full article 
        </a>
      </div>
      <p className="text-gray-500 font-bold text-2xl ">
        Type 
        <span className=" text-white font-bold border rounded-3xl text-center py-0 pb-1 ml-2 bg-blue-900  px-3 ">
          {item.type}
        </span>
      </p>
      <p className="text-gray-400 text-xl font-bold mt-3">
        {moment(item.created_at).format("D MMMM YYYY")}
      </p>

      {/* comments ------------------------- */}
      <div className="comments mt-6 ">
        <h4 className="text-3xl  text-blue-950">Comments  <span className="text-2xl  text-gray-500 ">{children.length-1}</span></h4>
        {children.length>0 && children.map(({author,created_at,text})=>(
        
        <div className=" border-b-2 border-gray-300  my-2 px-4 py-3 flex flex-col   text-lg  " style={created_at!==null ?{ display:"block"} : {display:"none"}}>
          <div className="flex gap-2 items-center">
            <div className=" w-6 h-6 inline-block rounded-3xl  bg-blue-900 border-2 border-blue-950   capitalize  " />
            <span>{ author && author  }</span> 
            <span className="text-gray-500 ml-2 ">
              {created_at!==null && moment( created_at , "YYYYMMDD").fromNow()}
            </span>
          </div>

          <p className=" text-justify ">{ text }</p>
        </div>
        ))} 
      </div>

      </> }
      
    
      </>}
    </div>
  );
};

export default PostDetail;
