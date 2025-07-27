import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogLIst from '../components/BlogLIst'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <BlogLIst/>
      <Newsletter/>
      
      
      <Footer/>
    </>
  )
}

export default Home