import React, {useState} from 'react';
import { signInWithEmailAndPassword   } from 'firebase/auth';
import Footer from '../Footer/Footer';
import { auth } from '../../config/firebase';
import { Link, useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';
import './Login.css'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState('');

    const login = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCreds)=> 
        {
            setUser(userCreds.user);
            // After user successfully logs in, navigate to home page
            navigate('/')
        }).catch((error)=>{
            alert(error.message);
        })
    }
 
    return(<>
         <Link to='/' className='backToHome'>
          <Button size='medium'>Back To Home</Button>
          </Link>
          <div className='loginFormParentDiv'>
            <div className='loginFormContainer'>
                <form>
                    <header>Sign In to your Account</header>
                    <div>   
                        <input name='email' type='email' placeholder='Email Address' required onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input name='password' type='password' placeholder='Password' required onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div className='loginBtn'>
                        <Button onClick={login} size='medium' variant='contained' color='success'>LOGIN</Button>
                    </div>
                </form>
            </div>
            <div className='signUp'>
             Don't have an Account yet?{''} <Link to='/signUp'><Button size='medium' variant='contained' color='success'>SIGN UP</Button></Link>
            </div>
          </div>     
        <Footer></Footer>
           </>             
    )
}
 
export default Login