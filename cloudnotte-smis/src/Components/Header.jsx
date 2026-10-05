import logo from '../assets/logo.png'
import './Header.css'
function Header(){
    return(
        <div className="header">
            <div className="header1">
            <button className="menu-button">
                ☰
            </button>
            <img src={logo} />
            </div>
            <button className="profile-button">EC</button>
        </div>
    )
}
export default Header