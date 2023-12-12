import React, { createContext, useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase'
export const UserSessionData = createContext()

  function AuthContext({children}) {
    const [user, setUser] = useState()
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          setUser(user)
        })
      },[setUser])
    return (
      <UserSessionData.Provider value={{user,setUser}}>
       {children}
      </UserSessionData.Provider>
    )
  }
  
  export default AuthContext