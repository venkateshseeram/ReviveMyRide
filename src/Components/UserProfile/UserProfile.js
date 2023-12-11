import React, {useEffect, useContext} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserSessionData } from '../Context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase'

function UserProfile() {

  const {user,setUser} = useContext(UserSessionData)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[setUser])

  return (
    <>
    <Navbar></Navbar>
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>
          Profile Info
        </Accordion.Header>
        <Accordion.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey='1'>
      <Accordion.Header>
        My Orders
      </Accordion.Header>
       <Accordion.Body>
      
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Footer></Footer>
    </>
  )
}

export default UserProfile