import React, { useEffect, useContext, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserSessionData } from '../Context/AuthContext'
import { query, orderBy, collection, getDocs } from 'firebase/firestore'
import { textDB, auth } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function OrderConfirmation () {
  let [latestOrder, setLatestOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useContext(UserSessionData)
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
    getOrderData()
  }, [setUser])

  const getOrderData = async () => {
    try {
      //get latest doc from the orders and for the order + user.uid i.e. 1st doc when sorted by desc order
      setLoading(true)
      const ordersRef = collection(textDB, 'Orders ' + user.uid)
      const q = query(ordersRef, orderBy('OrderCreationDate', 'desc'))
      let orderDataSnapshot = await getDocs(q)
      latestOrder = orderDataSnapshot.docs[0].data().Products
      setLatestOrder(latestOrder)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div>
        <header>Your Order Item Details</header>
        {loading ? (
          latestOrder.length > 0 ? (
            latestOrder.map(cartItem => (
              <div className='cartItemContainer' key={cartItem.id}>
                <div id='cartItemImage'>
                  <img src={cartItem.image} alt={cartItem.description} />
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
      </div>
      <Footer></Footer>
    </>
  )
}

export default OrderConfirmation
