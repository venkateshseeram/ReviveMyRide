import React,{useContext} from 'react'
import { UserSessionData } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth} from '../../config/firebase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../logo.png'
import '../Navbar/Navbar.css'
import { Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

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
        <Link to='/'>
         <button style={{font:'bold',color:'white'}}>REVIVE MY RIDE</button>
         </Link>
        </div>
      </div>
      <div className='non-logo-links'>
       <div>
       {user? ( <Link to='/profile'><PersonIcon/> </Link> ): (<Link to ='/login'>Login</Link>)}
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