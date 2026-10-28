import {useState,useEffect} from 'react'
import {Outlet} from 'react-router'
import Header from './Header'
import './Layout.css'

function Layout(){
    const [isMenuOpen,setIsMenuOpen]=useState(
        window.innerWidth>768
    )
    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 768) {
            setIsMenuOpen(true)
        } else {
            setIsMenuOpen(false)
        }
    }

    window.addEventListener('resize', handleResize)
    return () => {
        window.removeEventListener('resize', handleResize)
    }
}, [])
    return(
        <div className={`layout ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}>
            <Header 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}
export default Layout