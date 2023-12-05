import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import CartProducts from '../CartProducts/CartProducts';
import { UserSessionData } from './../Context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, textDB } from '../../config/firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import '../Cart/Cart.css'
function Cart() {
  const {setUser} = useContext(UserSessionData)
  const [cartProductsData, setCartProductsData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        setUser(user)
        /*
  Retrieve all products associated with the cart + userID , to be used 
  */   
        const querySnapshot = await getDocs(collection(textDB, "Cart "+ user.uid ));

        querySnapshot.forEach((doc)=>{
          cartProductsData.push({...doc.data()})
        })
        setLoading(true)
        if(cartProductsData.length === querySnapshot.docs.length)
        setCartProductsData(cartProductsData)
        }
      else
      navigate('/login')
  
      }) 
  },[cartProductsData])

  return (
    <>
    <Navbar></Navbar>
     <div className='cartProductParentDiv'>
     {loading? (
      <div className='cartProducts'>
      {
        cartProductsData.length > 0 ? (<CartProducts cartProductsData={cartProductsData}></CartProducts>):(<div>No products to be displayed for now! Please add some to cart from home page by clicking below to navigate.</div>)
      }
      </div>
      ):
        (<div>
          <p>Data is loading.. Please wait..</p>
      </div>)
      }
      </div>
    <Footer></Footer>
    </>
  )
}

export default Cart