import React,{useContext} from 'react'
import { UserSessionData } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth} from '../../config/firebase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../logo.png'
import '../Navbar/Navbar.css'
import { Badge } from '@mui/material';

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
        <div>
         <p style={{font:'bold',color:'white'}}>REVIVE MY RIDE</p>
        </div>
      </div>
      <div className='non-logo-links'>
        <div>{user? user.email: (<Link to ='/login'>Login</Link>)}
         </div>
       <div className='logout'>
       {user && (
        <button onClick={logout}>
        Logout
        </button>
        )}
        </div>  
        <div>
       <button onClick={handleSellerPost}>Sell</button>
       </div>
       <div className='cart'>
         <Link to='/cart'>
           <Badge badgeContent={0} color="primary">
            <ShoppingCartIcon/>
           </Badge> 
          
         </Link> 
        </div>  
       </div>
      </ul>
    </nav>
    </>
  )
}

export default Navbar
