import './navbar.scss'
import logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { logout } from '../../redusers/userReducer';


const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

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
                            {!isAuth && <li className="nav__link">
                                <NavLink to={'/login'} >Войти</NavLink>
                            </li>}
                            {!isAuth && <li className="nav__link">
                                <NavLink to={'/registration'}>Регистрация</NavLink>
                            </li>}
                            {isAuth && <li className="nav__link">
                                <div onClick={() => dispatch(logout())}>Выйти</div>
                            </li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar