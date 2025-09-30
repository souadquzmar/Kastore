
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { useState } from 'react'
import Profile from '../pages/profile/Profile'

export default function ProfileLayout() {
  const [isLoggedIn,setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));
  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    
        <Profile/>
    
    <Footer/>
    </>
  )
}
