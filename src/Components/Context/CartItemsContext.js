import React, {createContext,useState, useEffect, useContext} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, textDB} from '../../config/firebase';
import { collection,getAggregateFromServer,sum} from "firebase/firestore";
import { UserSessionData } from '../Context/AuthContext'

export const CartContext = createContext();

function CartItemsContext({children}) {
    const [cartItems,setCartItems] = useState([])
    const [cartLength, setCartLength] = useState(0)
    const {user, setUser} = useContext(UserSessionData)
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          setUser(user)
          if(user !== null){
          const coll = collection(textDB, 'Cart '+ user.uid);
          getAggregateFromServer(coll, {
                cartLength: sum('qty')
        }).then((data)=>{
          setCartLength(data['_data'].cartLength.integerValue)
        })
          }
       
      })
      },[])

  return (
     <CartContext.Provider value={{cartItems, setCartItems,cartLength,setCartLength}}>
       {children}
     </CartContext.Provider>
  )
}

export default CartItemsContext