import React from 'react'
import Navbar from './Header/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
    return (
        <>
<Navbar/>
<main className='pt-20'>
    <Outlet/>
</main>
<Footer/>
        </>
    );
}

export default Layout
