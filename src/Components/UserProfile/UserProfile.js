import React, {useEffect, useContext, useState} from 'react'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserSessionData } from '../Context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, textDB } from '../../config/firebase'
import { query, orderBy, collection, getDocs} from 'firebase/firestore'

function UserProfile() {
 
  let ordersData = [];
  const {user,setUser} = useContext(UserSessionData)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
      // getOrdersData()
    })
  },[setUser])

  const getOrdersData = async() =>{
    try{ 
      //get latest doc from the orders and for the order + user.uid i.e. 1st doc when sorted by desc order
      // setLoading(true)
     const ordersRef = collection(textDB,'Orders '+ user.uid)
     const q = query(ordersRef, orderBy('OrderCreationDate','desc'))
      let orderDataSnapshot = await getDocs(q)
         orderDataSnapshot.forEach((order)=>{
            ordersData.push(order.data())
         })
     }

     catch{
      console.log('errorrr')
     }

  }

  return (
    <>
    <Navbar></Navbar>
    <MDBAccordion initialActive={1}>
      <MDBAccordionItem collapseId={1} headerTitle='Profile Information'>
        Email Address: 
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle='My Orders'>
        Here goes the order details by desc order
      </MDBAccordionItem>
    </MDBAccordion>
    <Footer></Footer>
    </>
  )
}

export default UserProfile