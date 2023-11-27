//Retype as the code is copied
import React, {useState} from 'react';
import {  onAuthStateChanged, signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { NavLink, useNavigate} from 'react-router-dom'
import './Login.css'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
        })
        .catch((error) => {
            const errorMessage = error.message;
            // instead of console log, display a warning message using browser api 
            alert(errorMessage)
        });
       
    }
 
    return(
        <div className='loginFormParentDiv'>
        <div className='loginForm'>                       
                        <form >                                              
                            <div>
                               <header>SignIn with your Account</header>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div className='loginBtn'>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                       
               </div>  
               <NavLink to='/' className='backToHomeCTA'>
               Back To Home
           </NavLink>   
           </div>                    
    )
}
 
export default Login