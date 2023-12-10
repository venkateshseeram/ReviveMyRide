import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';
import CartProducts from '../CartProducts/CartProducts';
import { UserSessionData } from './../Context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, textDB } from '../../config/firebase'
import {collection, getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import '../Cart/Cart.css'
import { CartContext } from '../Context/CartItemsContext';

function Cart() {
  const {user,setUser} = useContext(UserSessionData)
  let [cartProductsData, setCartProductsData] = useState([])
  const [loading, setLoading] = useState(false)
  const {cartItems,setCartItems} = useContext(CartContext)
  const navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        setUser(user)
        /*
  Retrieve all products associated with the cart + userID , to be used 
  */   
      retreiveCartProducts(user)
        }
      else
      navigate('/login')
  
      }) 
  },[cartProductsData])

  const retreiveCartProducts = async(user) =>{
    cartProductsData = [];
    const querySnapshot = await getDocs(collection(textDB, "Cart "+ user.uid ));

    querySnapshot.forEach((doc)=>{
      cartProductsData.push({...doc.data()})
    })
    setLoading(true)
    if(cartProductsData.length === querySnapshot.docs.length)
    setCartProductsData(cartProductsData)
    setCartItems(cartProductsData)
  }

  const navigateToCheckout = async() =>{
    //get products when user clicks on checkout 
    await retreiveCartProducts(user)
    navigate('/checkout')
  }

  return (
    <>
    <Navbar></Navbar>
     <div className='cartProductParentDiv'>
     <Button id='continueToCheckout' color='success' variant='contained' onClick={navigateToCheckout}>Continue to Checkout</Button>
     {loading? (
      <div className='cartProducts'>
      {
        cartItems.length > 0 ? (<CartProducts></CartProducts>):(<div>No products to be displayed for now! Please add some to cart from home page by clicking below to navigate.</div>)
      }
      </div>
      ):
        (<div>
          <p>Data is loading..</p>
      </div>)
      }
      </div>
    <Footer></Footer>
    </>
  )
}

export default Cart