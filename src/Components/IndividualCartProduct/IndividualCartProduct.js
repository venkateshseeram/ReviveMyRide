import React, { useContext, useReducer, useState } from 'react'
import '../IndividualCartProduct/IndividualCartProduct.css'
import { cartReducer } from '../../reducers/cartReducer'
import { setDoc , doc, deleteDoc} from 'firebase/firestore'
import { textDB } from '../../config/firebase'
import { UserSessionData } from '../Context/AuthContext'

function IndividualCartProduct({cartProduct}) {
  const [loading, setLoading] = useState(true)
  const initialState = cartProduct
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const {user, setUser} = useContext(UserSessionData)

  const decrementQuantity = ()=>{
    if(state.qty > 1){  
      // decrease qty inside firestore
     let qty = state.qty - 1;
     let TotalProductPrice = state.price * qty;
     let updatedItems = {...state,qty, TotalProductPrice}
    const productRef = doc(textDB, 'Cart ' + user.uid, state.id)
     setDoc(productRef, updatedItems);

    dispatch({type:'DECREASE_QTY', payload:cartProduct})
    }
    else{
      alert('Please use Delete button')
    }
  }

  const incrementQuantity = ()=>{
    //increase qty inside firestore
     let qty = state.qty + 1;
     let TotalProductPrice = state.price * qty;
     let updatedItems = {...state,qty, TotalProductPrice}
    const productRef = doc(textDB, 'Cart ' + user.uid, state.id)
     setDoc(productRef, updatedItems);

    dispatch({type:'INCREASE_QTY', payload:cartProduct})

}

  
  const deleteProductFromCart = async()=>{
    setLoading(false)
    const productRef = doc(textDB, 'Cart ' + user.uid, state.id)
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
      <div className='productText price'>{state.price}</div>
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
         ${state.TotalProductPrice}
      </div>
      <button className="deleteProduct" onClick={deleteProductFromCart}>DELETE</button>
    </div> 
  </div>
</div>
  )
  )
}

export default IndividualCartProduct