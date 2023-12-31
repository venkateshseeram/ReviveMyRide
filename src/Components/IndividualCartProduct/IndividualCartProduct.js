import React, { useContext, useReducer, useState } from 'react'
import '../IndividualCartProduct/IndividualCartProduct.css'
import { cartReducer } from '../../reducers/cartReducer'
import { setDoc , doc, deleteDoc, getDoc} from 'firebase/firestore'
import { textDB } from '../../config/firebase'
import { UserSessionData } from '../Context/AuthContext'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import {CartContext} from '../Context/CartItemsContext'

function IndividualCartProduct({cartProduct}) {
  const [loading, setLoading] = useState(true)
  const initialState = cartProduct
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const {cartLength,setCartLength} = useContext(CartContext)
  const {user, setUser} = useContext(UserSessionData)
  let [updatedCartItem, setUpdatedCartItem] = useState([])

  let updatedCartLength;
  const decrementQuantity = ()=>{
    if(state.qty > 1){  
      // decrease qty inside firestore
     let qty = state.qty - 1;
     updatedCartLength = cartLength - 1;
     setCartLength(updatedCartLength)
     let TotalProductPrice = state.price * qty;
     let updatedItems = {...state,qty, TotalProductPrice}
    const productRef = doc(textDB, 'Cart ' + user.uid, state.id)
     setDoc(productRef, updatedItems)
    dispatch({type:'DECREASE_QTY', payload:cartProduct})
    }
    else{
      alert('Please use Delete button')
    }
  }

  const incrementQuantity = ()=>{
    //increase qty inside firestore
     let qty = state.qty + 1;
     updatedCartLength = Number(cartLength) + 1;
     setCartLength(updatedCartLength)
     let TotalProductPrice = state.price * qty;
     let updatedItems = {...state,qty, TotalProductPrice}
     const productRef = doc(textDB, 'Cart ' + user.uid, state.id)
     setDoc(productRef, updatedItems);
    
    dispatch({type:'INCREASE_QTY', payload:cartProduct})

}

  
  const deleteProductFromCart = async()=>{
    setLoading(false)
    const productRef = doc(textDB, 'Cart ' + user.uid, state.id)
     const resp = await getDoc(productRef)
    updatedCartLength = cartLength - resp.data().qty;
    setCartLength(updatedCartLength)
    await deleteDoc(productRef)
  }
  
  return (
    loading &&
(<div className='cartItems'>
  <div className='product'>
    <div className='productImage'>
      <img src={state.image} alt={state.description}/>
    </div> 
    <div className='productDetails'>
      <div className='productText title'>{state.name}</div>
      <div className='productText description'>{state.description}</div>
      <div className='productText price'>${state.price}</div>
      <div className='productText quantity'>
       <div>
         <button onClick={decrementQuantity}> - </button>
       </div>
       <span>{state.qty}</span>
       <div>
       <button onClick={incrementQuantity}> + </button>
       </div>
      </div>
      <div className='productText totalPrice'>
        <p>Total Price: <span style={{color:'red'}}>${state.TotalProductPrice}</span></p>
      </div>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteProductFromCart} color='error'>
        Delete
      </Button>
    </div> 
  </div>
</div>
  )
  )
}

export default IndividualCartProduct