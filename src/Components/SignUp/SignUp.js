import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Footer from '../Footer/Footer';
import { auth } from '../../config/firebase';
import { Link, useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';
import './SignUp.css'
 
const SignUp = () => {
    const navigate = useNavigate();
    const [userName,setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState();

    const registerUser = async(e)=>{
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password).then((userCreds)=>{
            console.log(userCreds)
            setUserName(userCreds.name);
            setUser(userCreds);
            navigate('/')
        }).catch((error)=> alert(error.message));

    }
 
    return(<>
         <Link to='/' className='backToHome'>
          <Button size='medium'>Back To Home</Button>
          </Link>
          <div className='signUpFormParentDiv'>
            <div className='signUpFormContainer'>
                <form>
                    <header>Register your Account</header>
                    <div>   
                        <input name='userName' placeholder='User Name' required onChange={(e)=> setUserName(e.target.value)}/>
                    </div>
                    <div>   
                        <input name='email' type='email' placeholder='Email Address' required onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input name='password' type='password' placeholder='Password' required onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div className='loginBtn'>
                        <Button size='medium' variant='contained' color='success' type='submit' onClick={registerUser}>SIGNUP</Button>
                    </div>
                </form>
            </div>
          </div>     
        <Footer></Footer>
           </>             
    )
}
 
export default SignUp
