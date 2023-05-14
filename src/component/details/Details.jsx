import React from 'react'
import { useSelector } from 'react-redux'

export default function Details() {
  const bookingData = useSelector((state) => state.date)
  const userData = useSelector((state) => state.user)
  const customerData = useSelector((state) => state.customer)
  const hotelData = useSelector((state) => state.hotel)

  console.log(bookingData)
  console.log(userData)
  console.log(customerData)
  console.log(hotelData)

  return (
    <div style={{textAlign:'center'}}>Details</div>
  )
}
