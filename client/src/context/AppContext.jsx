import { createContext, useContext, useEffect, useState }  from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext =createContext();

export const AppProvider =({children})=>{
     const navigate =useNavigate()
     const [token,setToken] =useState(null)
     const [blogs,setBlogs] =useState([])
     const [input,setInput]= useState("")
    const fetchBlogs =async() =>{
        try {
          const {data}= await axios.get('/api/blog/all');
          data.success ? setBlogs(data.blogs) : toast.error(data.message)
            
        } catch (error) {
            toast.error(error.message)
            
        }

      }
      useEffect(()=>{
        fetchBlogs();
        // check token in local storage to check it present for authorization
        const token=localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] =`${token}`; 

        }

      },[])

     const value ={
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput
     }
    return(
       
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )

}
export const useAppContext =()=>{
    return useContext(AppContext)

}



// import { createContext, useContext, useEffect, useState }  from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//     const navigate = useNavigate()
//     const [token, setToken] = useState(null)
//     const [blogs, setBlogs] = useState([])
//     const [input, setInput] = useState("")

//     const fetchBlogs = async() => {
//         try {
//             const { data } = await axios.get('/api/blog/all');
//             data.success ? setBlogs(data.blogs) : toast.error(data.message)
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     // Custom setToken function that handles localStorage
//     const updateToken = (newToken) => {
//         if (newToken && newToken.trim() !== '' && newToken !== 'null' && newToken !== 'undefined') {
//             setToken(newToken);
//             localStorage.setItem('token', newToken);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         } else {
//             setToken(null);
//             localStorage.removeItem('token');
//             delete axios.defaults.headers.common['Authorization'];
//         }
//     }

//     useEffect(() => {
//         fetchBlogs();
        
//         // Check token in localStorage - but validate it properly
//         const savedToken = localStorage.getItem('token');
//         if (savedToken && savedToken.trim() !== '' && savedToken !== 'null' && savedToken !== 'undefined') {
//             setToken(savedToken);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
//         } else {
//             // Clear invalid token from localStorage
//             localStorage.removeItem('token');
//             setToken(null);
//         }
//     }, [])

//     const value = {
//         axios,
//         navigate,
//         token,
//         setToken: updateToken, // Use the custom function
//         blogs,
//         setBlogs,
//         input,
//         setInput
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = () => {
//     return useContext(AppContext)
// }