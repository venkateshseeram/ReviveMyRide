import React, { useContext, useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  getAggregateFromServer,
  sum
} from 'firebase/firestore'
import Product from '../../pages/Product'
import '../Listings/Listings.css'
import { textDB } from '../../config/firebase'
import { UserSessionData } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { AllListingsContext } from '../Context/ListingsContext'
import { CartContext } from '../Context/CartItemsContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase'
import SearchBar from '../SearchBar/SearchBar'

function Listings () {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const { user, setUser } = useContext(UserSessionData)
  const [loading, setLoading] = useState(false)
  let { cartLength, setCartLength } = useContext(CartContext)
  const { allListings, setAllListings } = useContext(AllListingsContext)
  const [searchQuery, setSearchQuery] = useState('')

  let updatedProductData, updatedCartLength

  /*--------Function to add products to cart and to cart DB in firestore----------*/
  const addToCart = async productData => {
    if (user) {
      updatedProductData = productData
      //getDoc
      const docSnap = await getDoc(
        doc(textDB, 'Cart ' + user.uid, productData.id)
      )
      //if docSnap exists, then qty + 1 else qty = 1
      if (docSnap.exists()) {
        updatedProductData.qty = docSnap.data().qty + 1
      } else {
        updatedProductData.qty = 1
      }
      //set or update data regardless
      updatedProductData.TotalProductPrice =
        updatedProductData.qty * updatedProductData.price
      //Add data to the cart and cart data to firebase to persist through out the pages or user session
      await setDoc(
        doc(textDB, 'Cart ' + user.uid, updatedProductData.id),
        updatedProductData
      )
      const coll = collection(textDB, 'Cart ' + user.uid)
      const snapshot = await getAggregateFromServer(coll, {
        cartLength: sum('qty')
      })
      setCartLength(snapshot.data().cartLength)
      console.log('totalPopulation: ', snapshot.data().cartLength)
    } else navigate('/login')
  }

  /*--------Function to get products from firestore on page load----------*/
  const getProducts = async () => {
    let products = []
    const querySnapshot = await getDocs(collection(textDB, 'ProductInfo'))
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      products.push({ ...doc.data() })
      if (products.length === querySnapshot.docs.length) {
        setProducts(products)
        setAllListings(products)
        setLoading(true)
      }
    })
  }

  /*--------Function to filter products----------*/
  const filterProducts = (searchQuery, productData) => {
    if (!searchQuery) return productData
    else
      return productData.filter(item =>
        item.name.toLowerCase().includes(searchQuery)
      )
  }
  const dataFiltered = filterProducts(searchQuery, allListings)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
    setLoading(true)
    getProducts()
    setLoading(false)
  }, [setUser])

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></SearchBar>
      <div className='listings'>
        {loading ? (
          dataFiltered.map(item => (
            <Product
              key={item.id}
              product={item}
              addToCart={addToCart}
            ></Product>
          ))
        ) : (
          <div>Data is loading please wait</div>
        )}
      </div>
    </>
  )
}

export default Listings