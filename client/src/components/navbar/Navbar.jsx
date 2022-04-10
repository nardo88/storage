import './navbar.scss'
import logo from '../../assets/img/logo.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { logout } from '../../redusers/userReducer';
import { useState } from 'react';
import { getFiles, searchFiles } from '../../actions/file';
import { showLoader } from '../../redusers/appReducer';
import defaultAvatar from '../../assets/img/avatar.svg'
import { API_URL } from '../../config';


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : defaultAvatar

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [searchTimeOut, setSearchTimeOut] = useState(false)

    const searchHandler = (e) => {
        setSearch(e.target.value)
        if (searchTimeOut) {
            clearTimeout(searchTimeOut)
        }
        dispatch(showLoader())
        if (e.target.value !== '') {
            setSearchTimeOut(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }
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
                                <NavLink to={'/profile'} >
                                    <img className='nav__avatar' src={avatar} alt="" />
                                </NavLink>
                            </li>}
                            {isAuth && <li className="nav__link">
                                <div onClick={() => dispatch(logout())}>Выйти</div>
                            </li>}
                        </ul>
                    </nav>

                </div>
                {isAuth &&
                    <div className="search">
                        <input
                            type="text"
                            placeholder='Название файла...'
                            className='search__input'
                            value={search}
                            onChange={searchHandler}
                        />
                    </div>
                }

            </div>
        </header>
    )
}

export default Navbar