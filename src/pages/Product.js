import React, { useContext } from 'react'
import './Product.css'

function Product(props) {
  const{id, name,description ,price, image} = props.data
  const handleAddToCart = ()=>{
    props.addToCart(props.data)
  }
 
 
  return (
    <div className='product'>
      <img src={image}/>
      <div className='productDescription'>
        <p>{name}</p>
        <p>${price}</p>
        <p>{description}</p>
      </div>
      <div className='btn'>
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  )
}

export default Product