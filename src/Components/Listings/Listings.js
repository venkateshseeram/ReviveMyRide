import React, { useContext, useEffect, useState } from 'react'
import { products } from '../../pages/products'
import { collection, getDocs } from "firebase/firestore";
import Product from '../../pages/Product'
import '../Listings/Listings.css'
import { textDB } from '../../config/firebase'
import { UserSessionData } from '../Context/AuthContext'

function Listings() {
    const [count,setCount] = useState(0)
    const [products, setProducts] = useState([]);
    const {user,setUser} = useContext(UserSessionData)
    const [loading, setLoading] = useState(false)
    const addToCart = ()=>{

        setCount((prevCount)=>prevCount + 1)
    }

    const getProducts = async()=>{
      const querySnapshot = await getDocs(collection(textDB, "ProductInfo"));
     querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     products.push({...doc.data()})
      if(products.length === querySnapshot.docs.length){
        setProducts(products);
        setLoading(true)
        console.log('Product length',products.length)
      }
     });
    }

    useEffect(()=>{
      getProducts();
      setLoading(false)
    },[])

  return (
    <div className='listings'>
       {loading?
       products.map((item)=>
           <Product key={item.id} data={item}></Product>
           ) : <div>Data is loading please wait</div>}
    </div>
  )
}

export default Listings