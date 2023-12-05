import React,{useContext} from 'react'
import { UserSessionData } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth} from '../../config/firebase';
import {ShoppingCart} from 'phosphor-react'
import logo from '../../logo.png'
import '../Navbar/Navbar.css'

function Navbar() {
      const { user } = useContext(UserSessionData);
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
      <div className='logo'>
        <Link to='/'>
        <img src={logo}/>
        </Link>
      </div>
      <div className='nav-links'>
       {user? user.email: (<Link to ='/login'>Login</Link>)}
       {user && (
        <button onClick={logout}>
        Logout
        </button>
        )}
       <button onClick={handleSellerPost}>Sell</button>
       <div className='cart'>
       <Link to='/cart'>
         <ShoppingCart size={36}/>
         </Link> 
         </div>  
       </div>
      </ul>
    </nav>
    </>
  )
}

export default Navbar
