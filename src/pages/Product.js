import React, { useContext } from 'react'
import './Product.css'
import { IndividualProductContext } from '../Components/Context/ProductContext'
function Product({product, addToCart}) {

  const {setIndividualProduct} = useContext(IndividualProductContext)
  
  const handleAddToCart = ()=>{
    setIndividualProduct(product)
    addToCart(product)
  }
 
 
  return (
    <div className='product'>
      <img src={product.image}/>
      <div className='productDescription'>
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
      <div className='btn'>
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  )
}

export default Product