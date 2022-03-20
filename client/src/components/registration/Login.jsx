import { useState } from 'react'
import Input from '../input/input'
import './registration.scss'
import {login} from '../../actions/user'
import {useDispatch} from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    return (
        <div className="registration">
            <div className="registration__form">
                <div className="registration__header">Авторизация</div>
                <Input value={email} onChange={setEmail} type="text" placeholder={"Введите email"} />
                <Input value={password} onChange={setPassword} type="password" placeholder={"Введите пароль"} />
                <button 
                    className="registration__btn"
                    onClick={() => dispatch(login(email, password))}
                >
                    Войти
                </button>
            </div>

        </div>
    )
}

export default Login