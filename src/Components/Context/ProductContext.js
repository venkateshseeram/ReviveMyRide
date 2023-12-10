import React, {createContext,useState} from 'react'
export const IndividualProductContext = createContext();
function ProductContext({children}) {
    const [individualProduct,setIndividualProduct] = useState([])
  return (
     <IndividualProductContext.Provider value={{individualProduct,setIndividualProduct}}>
       {children}
     </IndividualProductContext.Provider>
  )
}

export default ProductContext