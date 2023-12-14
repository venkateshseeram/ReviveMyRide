import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartItemsContext'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, textDB } from '../../config/firebase'
import { Button } from '@mui/material'
import './Checkout.css'
import { UserSessionData } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  setDoc,
  doc,
  Timestamp,
  getDocs,
  collection,
  writeBatch
} from 'firebase/firestore'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'

function Checkout () {
  const { cartItems, setCartItems, setCartLength } = useContext(CartContext)
  const { user, setUser } = useContext(UserSessionData)
  const navigate = useNavigate()
  let [cartPrice, setCartPrice] = useState(0)
  let cartProductsData
  let [loading, setLoading] = useState(false)

  const stripePromise = loadStripe(
    'pk_test_51ON53pEoKdN7VGcFYMvyxeABtSPNxPZblTL4qQJz4bbKQn13sOcWW24foW4q7o7DQqJtsBlmdv4pY1yBNFkk8lwL00aJcU8fpc'
  )

  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
    if (user === null) {
      navigate('/login')
    } else {
      retreiveCartProducts()
      if (cartItems.length > 0) {
        cartPrice = cartItems.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.TotalProductPrice
        }, 0)
        setCartPrice(cartPrice)
        // Url to Firebase function
        fetch(
          'https://us-central1-revive-my-ride.cloudfunctions.net/createStripePayments/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Adding the order data to payload
            body: JSON.stringify(cartItems)
          }
        )
          .then(res => res.json())
          .then(data => {
            setClientSecret(data.clientSecret)
          })
      }
    }
  }, [setUser])

  /* -----------Call to retreive cart products to be displayed on checkout page-------*/
  const retreiveCartProducts = async () => {
    cartProductsData = []
    const querySnapshot = await getDocs(collection(textDB, 'Cart ' + user.uid))

    querySnapshot.forEach(doc => {
      cartProductsData.push({ ...doc.data() })
    })
    setLoading(true)
    if (cartProductsData.length === querySnapshot.docs.length)
      setCartItems(cartProductsData)
  }

  /* ---On place order , add the cart items ordered to Orders collection, delete items from Cart ------*/
  const handlePlaceOrder = async () => {
    let currentDate = Timestamp.fromDate(new Date())
    let EstimatedDeliveryDate = Timestamp.fromDate(new Date())
    //save details like userInfo and paymentType and orderItems(as an array) in Orders collection under 'Order + user.uid' document  with OrderCreationDate as asOfnowTime
    try {
      await setDoc(
        doc(textDB, 'Orders ' + user.uid, 'Order on: ' + new Date()),
        {
          Products: cartItems,
          PaymentMethod: 'Stripe',
          uid: user.uid,
          OrderCreationDate: currentDate,
          EstimatedDeliveryDate,
          cartId: 'cart-' + user.uid + '-' + currentDate
        }
      )
      setTimeout(() => {
        alert('....Order has been succesfully placed...')
      }, 3000)

      //Delete cart items from the user's cart using batch writes
      const batch = writeBatch(textDB)
      const cartSnapshot = await getDocs(collection(textDB, 'Cart ' + user.uid))

      cartSnapshot.forEach(doc => {
        batch.delete(doc.ref)
      })
      batch
        .commit()
        .then(() => {
          console.log('deleted the cart items')
        })
        .catch(error => alert(error.message))

      setCartLength(0)
      //Wait for 3 seconds before navigating to Order Confirmation Page
      setTimeout(() => {
        navigate('/orderConfirmation')
      }, 3000)
    } catch {
      alert("Order couldn't be processed")
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className='grid-container'>
        <h1>CHECKOUT</h1>
        <form
          className='payment-form'
          onSubmit={e => handlePlaceOrder(e)}
          autoComplete='off'
        >
          <div className='grid-item order-summary'>
            <header>Order Summary</header>
            {loading ? (
              cartItems.length > 0 ? (
                cartItems.map(cartItem => (
                  <div className='cartItemContainer' key={cartItem.id}>
                    <div id='cartItemImage'>
                      <img src={cartItem.image} alt={cartItem.image} />
                    </div>
                    <div className='cartItemDetails'>
                      <div id='cartItemName'>{cartItem.name}</div>
                      <div id='cartItemQP'>
                        <div id='cartItemQty'>Qty: {cartItem.qty}</div>
                        <div id='cartItemPrice'>${cartItem.price}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div> !!No products to be displayed!!</div>
              )
            ) : (
              <div>...Data is loading.. please wait...</div>
            )}

            <div className='edit-order' style={{ padding: '1vw' }}>
              <Button
                size='medium'
                color='error'
                variant='contained'
                onClick={() => {
                  navigate('/cart')
                }}
              >
                Edit Order
              </Button>
            </div>
          </div>
          <div className='grid-item payment'>
            <header>Payment Information</header>
            <p style={{ color: 'red' }}>Balance Due : ${cartPrice}</p>
            <div className='payment-type'>
              <header>Please select your prefered Payment Type:</header>
              {clientSecret && (
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ clientSecret, onComplete: handlePlaceOrder }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              )}
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Checkout
