import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login/Login'
import Signup from './Components/SignUp/SignUp';
import PostAnAd from './Components/PostAnAd/PostAnAd';
import Cart from './Components/Cart/Cart'
import {UserSessionData} from './Components/Context/AuthContext'
import ListingsContext from './Components/Context/ListingsContext';
import ProductContext from './Components/Context/ProductContext';
import Checkout from './Components/Checkout/Checkout';
import UserProfile from './Components/UserProfile/UserProfile';
import './App.css'
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
function App() {  
  const [user, setUser] = useState()
  return (
      <UserSessionData.Provider value={{user,setUser}}>
      <ListingsContext>
      <ProductContext>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/signup' Component={Signup}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/postAnAd' Component={PostAnAd}></Route>
          <Route path='/cart' Component={Cart}></Route>
          <Route path='/checkout' Component={Checkout}></Route>
          <Route path='/profile' Component={UserProfile}></Route>
          <Route path='/orderConfirmation' Component={OrderConfirmation}></Route>
        </Routes>
        </ProductContext>
        </ListingsContext> 
        </UserSessionData.Provider>
  );
}

export default App;