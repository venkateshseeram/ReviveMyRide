import React, { useContext, useState } from 'react'
import './Product.css'
import { IndividualProductContext } from '../Components/Context/ProductContext'
import Button from '@mui/material/Button'

function Product ({ product, addToCart }) {
  const { setIndividualProduct } = useContext(IndividualProductContext)
  const [addedToCart, setAddedToCart] = useState('Add to Cart')

  const handleAddToCart = () => {
    setIndividualProduct(product)
    setAddedToCart('Added To Cart')
    addToCart(product)
    setTimeout(() => {
      setAddedToCart('Add To Cart')
    }, 500)
  }

  return (
    <div className='product'>
      <img src={product.image} alt={product.description} />
      <div className='productDescription'>
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
      <div className='btn'>
        <Button
          variant='contained'
          onClick={handleAddToCart}
          color='success'
          size='medium'
        >
          {addedToCart}
        </Button>
      </div>
    </div>
  )
}

export default Product
