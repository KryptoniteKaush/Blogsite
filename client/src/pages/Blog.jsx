// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { assets, blog_data, comments_data } from "../assets/assets";
// import Navbar from "../components/Navbar";
// import Moment from "moment";
// import Footer from "../components/Footer";
// import Loader from "../components/Loader";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Blog = () => {
//   const { id } = useParams();
//   const {axios} =useAppContext()
//   const [data, setData] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [name, setName] = useState('');
//   const [content, setContent] = useState('');

//   const fetchBlogData = async () => {
//     // this is for dummy data
//     // const data = blog_data.find(item => item._id === id);
//     // setData(data);
//     try {
//       const{data} = await axios.get(`/api/blog/${id}`)
//       data.success ? setData(data.blog): toast.error(data.message)
      
//     } catch (error) {
//       toast.error(error.message)
      
//     }
//   };
//   const fetchComments = async () => {
//     // for blog data in asset 
//     // setComments(comments_data);
//     try {
//       const {data} =await axios.post('/api/blog/comments',{blogId:id})
//       if(data.success){
//         setComments(data.comments)
//       }else{
//         toast.error(data.message)
//       }
      
//     } catch (error) {
//       toast.error(error.message)
      
//     }
//   };
//   const addComment = async (e) => {
//      e.preventDefault();
//      try {
//       const {data} =await axios.post('/api/blog/add-comment',{blog:id,name,content})
//       if(data.success){
//         toast.success(data.message)
//         setName('')
//         setContent('')
//       }else{
//         toast.error(data.message)

//       }
      
//      } catch (error) {
//       toast.error(error.message)
      
//      }

//   };

//   useEffect(() => {
//     fetchBlogData();
//     fetchComments();
//   }, [id]);
//   console.log("Current ID from params:", id);
//   console.log("Blog data:", data);


//   return data ? (
//     <div className="relative">
//       <img
//         src={assets.gradientBackground}
//         alt=""
//         className="absolute -top-50 -z-1 opacity-50"
//       />
//       <Navbar />
//       <div className="text-center mt-20 text-gray-600">
//         <p className="text-primary py-4 font-medium ">
//           {" "}
//           Published on {Moment(data.createdAt).format("MMMM Do YYYY ")}
//         </p>
//         <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
//           {data.title}{" "}
//         </h1>
//         <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
//         <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
//           {" "}
//           Michael Brown
//         </p>
//       </div>
//       <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
//         <img src={data.image} alt="rounded-3xl mb-5" />
//         <div
//           className="rich-text max-w-3xl mx-auto"
//           dangerouslySetInnerHTML={{ __html: data.description }}
//         ></div>
//         {/* comment section */}
//         <div className="mt-14 mb-10 max-w-3xl mx auto">
//           <p className="font-semibold mb-4">Comments{comments.length}</p>
//           <div className="flex flex-col gap-4">
//             {comments.map((item, index) => (
//               <div
//                 key={index}
//                 className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <img src="assets.user_icon" alt="" className="w-6" />
//                   <p className="font-medium">{item.name}</p>
//                 </div>
//                 <p className="text-sm max-w-md ml-8">{item.content}</p>
//                 <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
//                   {Moment(item.createdAt).fromNow()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* { add a comment section} */}
//         <div className="max-w-3xl mx-auto">
//           <p className="font-semibold mb-4">Add your comment</p>
//           <form
//             onSubmit={addComment}
//             className="flex flex-col items-start gap-4 max-w-lg"
//           >
//             <input
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               type="text"
//               placeholder="name"
//               required
//               className="w-full p-2 border border-gray-300 rounded outline-none"
//             />
//             <textarea
//               onChange={(e) => setContent(e.target.value)}
//               value={content}
//               placeholder="Comment"
//               className="w-full p-2 border border-gray-300 rounded outline-none h-48"
//               required
//             ></textarea>
//             <button
//               type="submit"
//               className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//         {/* {Share Buttons} */}
//         <div className="my-24 max-w-3xl mx-auto">
//           <p className="font-semibold my-4">
//             Share this article on social media
//           </p>

//           <div className="flex">
//             <img src={assets.facebook_icon} width={50} alt="" />
//             <img src={assets.twitter_icon} width={50} alt="" />
//             <img src={assets.googleplus_icon} width={50} alt="" />
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   ) : (
//     <div> <Loader/></div>
//   );
// };

// export default Blog;









import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import SummarizeButton from "../components/SummarizeButton"; // ADD THIS LINE
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const {axios} = useAppContext()
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const{data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog): toast.error(data.message)
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  const fetchComments = async () => {
    try {
      const {data} =await axios.post('/api/blog/comments',{blogId:id})
      if(data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  const addComment = async (e) => {
     e.preventDefault();
     try {
      const {data} =await axios.post('/api/blog/add-comment',{blog:id,name,content})
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments(); // Refresh comments after adding
      }else{
        toast.error(data.message)
      }
      
     } catch (error) {
      toast.error(error.message)
      
     }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium ">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY ")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Michael Brown
        </p>
        
        {/* ADD THIS SECTION - Summarize Button */}
        <div className="flex justify-center mt-6 mb-4">
          <SummarizeButton 
            postContent={data.description} 
            postTitle={data.title}
            axios={axios}
          />
        </div>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* comment section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* add a comment section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              className="w-full p-2 border border-gray-300 rounded outline-none h-24"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-2">
            <img src={assets.facebook_icon} width={50} alt="" className="cursor-pointer hover:scale-105 transition-transform" />
            <img src={assets.twitter_icon} width={50} alt="" className="cursor-pointer hover:scale-105 transition-transform" />
            <img src={assets.googleplus_icon} width={50} alt="" className="cursor-pointer hover:scale-105 transition-transform" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  ) : (
    <div><Loader/></div>
  );
};

export default Blog;




