import React from 'react'
import '../IndividualCartProduct/IndividualCartProduct.css'
function IndividualCartProduct({cartProduct}) {
  return (
<div className='cartItems'>
  <div className='product'>
    <div className='productImage'>
      <img src={cartProduct.image} alt={cartProduct.description}/>
    </div> 
    <div className='productDetails'>
      <div className='productText title'>{cartProduct.name}</div>
      <div className='productText description'>{cartProduct.description}</div>
      <div className='productText price'>{cartProduct.price}</div>
      <div className='productText quantity'>
       <span>Quantity: {cartProduct.qty}</span>
      </div>
      <div className='productText totalPrice'>
         ${cartProduct.TotalProductPrice}
      </div>
      <button className="deleteProduct">DELETE</button>
    </div> 
  </div>
</div>
  )
}

export default IndividualCartProduct