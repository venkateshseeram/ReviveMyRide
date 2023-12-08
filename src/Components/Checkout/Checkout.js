import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartItemsContext'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth} from '../../config/firebase';
import { Button } from '@mui/material'
import './Checkout.css'
import { UserSessionData } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Checkout() {
    const {cartItems, setCartItems} = useContext(CartContext)
    const {user, setUser} = useContext(UserSessionData)
    const navigate = useNavigate()
    const [isAccordionActive, setIsAccordionActive] = useState(false);
    let [cartPrice, setCartPrice] = useState(0)
    let cartData= cartItems;
  
  useEffect(()=>{
    console.log("In cart",cartData)
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
    cartData = cartItems;
    if(user === null){
      navigate('/login')
    }
    else{
      if(cartItems.length > 0) {
        cartPrice = cartItems.reduce((accumulator, currentValue)=>{return accumulator + currentValue.TotalProductPrice},0)
        setCartPrice(cartPrice)
      }
     
    }
  },[setUser])

  return (
    <>
    <Navbar></Navbar>
    <div className="grid-container">
    <h1>CHECKOUT</h1>
      <div className="grid-item order-summary">
         <header>Order Summary</header>
         {cartData.length > 0 ? 
          (cartData.map((cartItem)=>
           (<div className='cartItemContainer' key={cartItem.id}>
               <div id='cartItemImage'>
                 <img src={cartItem.image} />
               </div>
               <div className='cartItemDetails'>
                   <div id='cartItemName'>
                     {cartItem.name}
                   </div>
                   <div id='cartItemQP'>
                   <div id='cartItemQty'>
                     Qty: {cartItem.qty}
                   </div>
                   <div id='cartItemPrice'>
                     ${cartItem.price}
                   </div>
                   </div>
               </div>
           </div>)
          )) :
           (<div> !!No products to be displayed!!</div>)}
          <div className='edit-order' style={{padding:'1vw'}}>
           <Button size='medium' color='error' variant='contained' onClick={()=>{navigate('/cart')}}>Edit Order</Button>
          </div>
       </div>
      <div className="grid-item payment">
        <header>Payment Information</header>
        <p style={{color:'red'}}>Balance Due : ${cartPrice}</p>
        <div className='payment-type'>
         <form className='payment-selection-form'>
          <p style={{fontWeight:'bold',color:'blue'}}>Please select your prefered Payment Type:</p>
    		  <input type="radio" id="COD" name="payment" value="COD" selected/> Cash On Delivery
          <input type="radio" id="Stripe" name="payment" value="Stripe" /> Stripe Payment
         </form>
         </div>
        </div>
      <div className="grid-item place-order">
       <Button variant='contained' color='success' size='medium'>Place Your Order</Button>
      </div>    
    </div>
    <Footer></Footer>
    </>
  )
}

export default Checkout