import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login/Login'
import Signup from './Components/SignUp/SignUp';
import {UserSessionData} from './Components/Context/AuthContext';
import PostAnAd from './Components/PostAnAd/PostAnAd';
import './App.css'
function App() {  
  const [user, setUser] = useState()
  return (
      <UserSessionData.Provider value={{user,setUser}}>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/signup' Component={Signup}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/postAnAd' Component={PostAnAd}></Route>
        </Routes>
        </UserSessionData.Provider>
  );
}

export default App;
