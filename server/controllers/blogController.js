import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";
import main from "../configs/gemini.js";

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;
    // check if all field are present

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    // here we have to upload the image on cloudnary and convert the image to base 64
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload Image to Imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });
    // optimization through imagekit Url transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' }, //auto compression
        { format: 'webp' }, // Convert to modern format
        { width: '1280' }, // width resizing
      ] 
    });
    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.json({ success: true, message: " Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
 
export const getAllBlogs = async(req,res)=>{
    try {
        const blogs =await Blog.find({isPublished:true})
        res.json({ success: true, blogs });
        
    } catch (error) {
         res.json({ success: false, message: error.message });
        
    }
}

export const getBlogById =async(req,res)=>{
    try {
        const {blogId} =req.params;
        const blog =await Blog.findById(blogId)
        if(!blog){
            return res.json({success:false,message:"Blog not found"});


        }
        res.json({success:true,blog})
    } catch (error) {
         res.json({ success: false, message: error.message });
        
    }

}

export const deleteBlogById =async(req,res)=>{
    try {
        const {id} =req.body;
        
        await Blog.findByIdAndDelete(id)

        // delete all comments associated with the blog
        await Comment.deleteMany({blog:id});





        
        res.json({success:true,message:'Blog Deleted Successfully'})
    } catch (error) {
         res.json({ success: false, message: error.message });
        
    }

}

export const togglePublish =async(req,res)=>{
    try {
         const {id} =req.body;
         const blog =await Blog.findById(id);
         blog.isPublished =!blog.isPublished;
         await blog.save();
         res.json({success:true,message:'Blog Updated Successfully'})



        
    } catch (error) {
         res.json({ success: false, message: error.message })
        
    }

}


export const addComment =async(req,res)=>{

    try {
        const {blog,name,content} =req.body;
        await Comment.create({blog,name,content})
        res.json({ success: true, message:'Comment Added for review'})
        
    } catch (error) {
        res.json({ success: false, message: error.message })
        
    }
}
//this for to get comment of indivisual blog

export const getBlogComments = async(req,res)=>{
    try {
        const {blogId} =req.body;
        const comments =await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1});
         res.json({ success: true, comments})
        
    } catch (error) {
         res.json({ success: false, message: error.message })
        
    }
}

export const generateContent =async(req,res)=>{
  try {

    const{prompt} =req.body;
    const content = await main(prompt + 'Generate Blog by Using Ai')
    res.json({success: true,content})
    
  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}
// ADD this new function to your existing blogController.js file
export const summarizeExistingPost = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.json({ success: false, message: "Post content is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Please create a concise summary of this blog post (3-4 sentences):\n\n${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text().trim();

    res.json({ success: true, summary: summary.replace(/^["']|["']$/g, '') });
    
  } catch (error) {
    console.error("Error summarizing post:", error);
    res.json({ success: false, message: "Failed to generate summary" });
  }
};