import React, {createContext,useState} from 'react'
export const AllListingsContext = createContext();
function ListingsContext({children}) {
    const [allListings,setAllListings] = useState([])
  return (
     <AllListingsContext.Provider value={{allListings,setAllListings}}>
       {children}
     </AllListingsContext.Provider>
  )
}

export default ListingsContext