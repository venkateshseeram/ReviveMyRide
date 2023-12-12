import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import Footer from '../Components/Footer/Footer';
import { UserSessionData } from './Context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import Listings from './Listings/Listings'

function Home() {
  // const {user,setUser} = useContext(UserSessionData)
  // useEffect(()=>{
  //   onAuthStateChanged(auth,(user)=>{
  //     setUser(user)
  //   })
  // },[setUser])
 
  return (
    <>
    <Navbar></Navbar>
    <Listings></Listings>
    <Footer></Footer>
    </>
  )
}

export default Home
