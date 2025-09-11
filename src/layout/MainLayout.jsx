
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export default function MainLayout() {
  return (
    <>
    <Navbar/>
    <Container>
        <Outlet/>
    </Container>
    <Footer/>
    </>
  )
}
