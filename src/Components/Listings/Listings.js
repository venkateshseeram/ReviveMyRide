import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Product from '../../pages/Product'
import '../Listings/Listings.css'
import { textDB } from '../../config/firebase'
import { UserSessionData } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Listings() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const {user} = useContext(UserSessionData)
    const [loading, setLoading] = useState(false)
    let updatedProductData;
    const addToCart= async(productData)=>{

      if(user){
      updatedProductData = productData;
      updatedProductData.qty = 1;
      updatedProductData.TotalProductPrice = updatedProductData.qty *updatedProductData.price;
      //Add data to the cart and cart data to firebase to persist through out the pages or user session
      await setDoc(doc(textDB, 'Cart ' + user.uid, updatedProductData.id), updatedProductData);
      }
    else
      navigate('/login') 
    }
  
    const getProducts = async()=>{
      const querySnapshot = await getDocs(collection(textDB, "ProductInfo"));
     querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
     products.push({...doc.data()})
      if(products.length === querySnapshot.docs.length){
        setProducts(products);
        setLoading(true)
      }
     });
    }

    useEffect(()=>{
      setLoading(true)
      getProducts();
      setLoading(false)
    },[])

  return (
    <div className='listings'>
        { loading?
       products.map((item)=> <Product key={item.id} data={item} addToCart={addToCart}></Product>
       ) 
       : <div>Data is loading please wait</div>
    }
    </div>
  )
}

export default Listings