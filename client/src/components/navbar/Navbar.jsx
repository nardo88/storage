import './navbar.scss'
import logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__logo">
                        <a href="/">
                            <img src={logo} alt="logo" />
                        </a>
                        <span className="header__logo-text">
                            MERN CLOUD
                        </span>
                    </div>
                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__link">
                                <NavLink to={'/login'} >Войти</NavLink>
                            </li>
                            <li className="nav__link">
                                <NavLink to={'/registration'}>Регистрация</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar