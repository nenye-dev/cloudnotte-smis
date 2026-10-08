import {useState} from 'react'
import {Outlet} from 'react-router'
import Header from './Header'
import './Layout.css'

function Layout(){
    const [isMenuOpen,setIsMenuOpen]=useState(false)
    return(
        <div className="layout">
            <Header isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            />
            <main 
            className={`main-content ${
                isMenuOpen ? 'main-content-shifted':''
                }`}
            >
                <Outlet />
            </main>
        </div>
    )
}
export default Layout