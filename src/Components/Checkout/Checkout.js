import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '../Context/CartItemsContext'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, textDB} from '../../config/firebase';
import { Button } from '@mui/material'
import './Checkout.css'
import { UserSessionData } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { setDoc , doc, Timestamp, getDocs, collection, query, orderBy} from 'firebase/firestore'

function Checkout() {
    const {cartItems, setCartItems} = useContext(CartContext)
    const {user, setUser} = useContext(UserSessionData)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [isAccordionActive, setIsAccordionActive] = useState(false);
    let [cartPrice, setCartPrice] = useState(0)
    let cartData= cartItems;
    let [state, setState] = useState('')
    let [zipCode, setZipCode] = useState('')
    let [streetAdress, setStreetAddress] = useState('')
    let [paymentType, setPaymentType] = useState('')
  
  useEffect(()=>{
    console.log('In use effect')
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
      console.log('In effect',user)
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

  const handlePlaceOrder = async(event) =>{
    event.preventDefault()
    let currentDate = Timestamp.fromDate(new Date())
    let EstimatedDeliveryDate = Timestamp.fromDate(new Date());
    console.log('Payment Type', paymentType)
  //save details like userInfo and paymentType and orderItems(as an array) in Orders collection under 'Order + user.uid' document  with OrderCreationDate as asOfnowTime
   try{ 
   await setDoc(doc(textDB, 'Orders '+ user.uid,'Order on: ' + new Date()),{
    Products: cartItems,
    PaymentMethod: paymentType,
    uid: user.uid,
    OrderCreationDate: currentDate,
    EstimatedDeliveryDate,
    Address:{'Street Address': streetAdress, 'zip code':zipCode, 'state':state },
    cartId:'cart-'+ user.uid + '-'+ currentDate
   })
      setState('')
      setZipCode('')
      setStreetAddress('')
      setPaymentType('')
      setTimeout(()=>{
        alert('....Order has been succesfully placed...')
      }, 3000)

      setTimeout(()=>{
        navigate('/orderConfirmation')
      }, 3000)
  }
   catch{
     alert("Order couldn't be processed")
   }
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="grid-container">
    <h1>CHECKOUT</h1>
    <form className='payment-form' onSubmit={(e)=>handlePlaceOrder(e)}>
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
      <div className='grid-item userInfo'>
      <header>User Information</header>
       <fieldset className='inputData userInfo'>
        <input id='address' type='address' placeholder='Street Address' value={streetAdress}required onChange={(e)=>setStreetAddress(e.target.value)}/>
        <input id='zipcode' placeholder='ZipCode' value={zipCode} required onChange={(e)=>setZipCode(e.target.value)}/>
        <br/>
        <label>Select State: </label>
        <select value={state} required onChange={(e)=>setState(e.target.value)}>
        <option value=''>None</option>
         <option value='MA'>MA</option>
         <option value='MI'>MI</option>
        </select>
        </fieldset> 
      </div>
      <div className="grid-item payment">
        <header>Payment Information</header>
        <p style={{color:'red'}}>Balance Due : ${cartPrice}</p>
        <div className='payment-type'>
          <header>Please select your prefered Payment Type:</header>
          <fieldset className='inputData paymentInfo'>
    		  <input type="radio" id="COD" name="payment" value='Cash On Delivery' onChange={(e)=> setPaymentType(e.target.value)} required/> Cash On Delivery
          <input type="radio" id="Stripe" name="payment" value='Stripe' onChange={(e)=> setPaymentType(e.target.value)}/> Stripe Payment
          </fieldset>
         </div>
        </div>
      <div className="grid-item place-order">
       <Button variant='contained' color='success' size='medium' type='submit'>Place Your Order</Button>
      </div>    
      </form>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Checkout