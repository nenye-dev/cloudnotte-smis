import {Link} from 'react-router'
import logo from '../assets/logo.png'
import './Header.css'
function Header({isMenuOpen,setIsMenuOpen}){
    const handleMenuClick =()=>{
        setIsMenuOpen(!isMenuOpen)
    }
    const handleNavigation=()=>{
        if(window.innerWidth <=768 ){
            setIsMenuOpen(false)
        }
    }
    return(
    <>
        <header className="header">
            <div className="header1">
            <button 
            className="menu-button"
            onClick={handleMenuClick}
            >
                ☰
            </button>
            <Link to="/">
                <img src={logo} />
            </Link>
            </div>
            <button className="profile-button">
                EC
            </button>
        </header>
        <nav className={`side-menu ${
            isMenuOpen ? 'side-menu-open' : ''
        }`}>
            <div className="menu-header">
                <h2>Menu</h2>
                <button 
                className="close-button"
                onClick={handleMenuClick}
                >
                    x
                </button>
             </div>
                <div className="menu-links">
                    <Link 
                        to ="/"
                        onClick={handleNavigation}
                    >
                        Home
                    </Link>
                    <Link 
                        to ="students"
                        onClick={handleNavigation}
                    >
                        Students
                    </Link>
                    <Link 
                        to ="courses"
                        onClick={handleNavigation}
                    >
                        Courses
                    </Link>
                    <Link 
                        to ="about"
                        onClick={handleNavigation}
                    >
                        About
                    </Link>
                </div>
        </nav>
    </>
    )
}
export default Header