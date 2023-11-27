import React,{useContext, useState} from 'react'
import { UserSessionData } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth} from '../../config/firebase';
import Cart from '../Cart/Cart';
import '../Navbar/Navbar.css'

function Header() {
      const { user , setUser} = useContext(UserSessionData);
      const navigate = useNavigate();
      const logout= ()=> {
        signOut(auth).then(()=>{
          navigate("/")
        }).catch((error)=>{
          alert(error)
        })
      }

     const handleSellerPost = ()=>{
       user? (navigate('/postAnAd')): alert("User has to login first")
     }
  
  return (
    <>
    <nav>
      <ul className='nav-links'>
       {user? user.email: (<Link to ='/login'>Login</Link>)}
       {user && (<button onClick={logout}>Logout</button>)}
       <button onClick={handleSellerPost}>Sell</button>
       <Cart></Cart> 
      </ul>
    </nav>
    </>
  )
}

export default Header