import React, { useEffect, useContext, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserSessionData } from '../Context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, textDB } from '../../config/firebase'
import { query, orderBy, collection, getDocs, limit } from 'firebase/firestore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function UserProfile () {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  let ordersData = []
  let { user, setUser } = useContext(UserSessionData)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
      getOrdersData()
    })
  }, [setUser])

  const getOrdersData = async () => {
    try {
      //get latest doc from the orders and for the order + user.uid i.e. 1st doc when sorted by desc order
      setLoading(true)
      const ordersRef = collection(textDB, 'Orders ' + user.uid)
      const q = query(ordersRef, orderBy('OrderCreationDate', 'desc'), limit(5))
      let orderDataSnapshot = await getDocs(q)
      orderDataSnapshot.forEach(order => {
        ordersData.push(order.data().Products)
      })
    } catch {
      console.log('errorrr')
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div style={{ padding: '20vh' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Profile Information
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Contains User Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Email Address: {user.email}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2bh-content'
            id='panel2bh-header'
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              My Orders
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Contains 5 Recent Order Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <header>My Recent Orders</header>
            {
              //   loading ? (
              //   ordersData.length > 0 ? (
              //     ordersData.map(orders =>
              //       orders.map(order => {
              //         <div className='cartItemContainer' key={order.id}>
              //           <div id='cartItemImage'>
              //             <img src={order.image} alt={order.description} />
              //           </div>
              //           <div className='cartItemDetails'>
              //             <div id='cartItemName'>{order.name}</div>
              //             <div id='cartItemQP'>
              //               <div id='cartItemQty'>Qty: {order.qty}</div>
              //               <div id='cartItemPrice'>${order.price}</div>
              //             </div>
              //           </div>
              //         </div>
              //       })
              //     )
              //   ) : (
              //     <div> !!No products to be displayed!!</div>
              //   )
              // ) : (
              //   <div> Data is loading.... please wait</div>
              // )
            }
          </AccordionDetails>
        </Accordion>
      </div>
      <Footer></Footer>
    </>
  )
}

export default UserProfile
