import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Listings from './Listings/Listings'

function Home () {
  return (
    <>
      <Navbar></Navbar>
      <Listings></Listings>
      <Footer></Footer>
    </>
  )
}

export default Home
