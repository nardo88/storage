import { useState } from 'react'
import Input from '../input/input'
import './registration.scss'
import {registration} from '../../actions/user'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="registration">
            <div className="registration__form">
                <div className="registration__header">Регистрация</div>
                <Input value={email} onChange={setEmail} type="text" placeholder={"Введите email"} />
                <Input value={password} onChange={setPassword} type="password" placeholder={"Введите пароль"} />
                <button 
                    className="registration__btn"
                    onClick={() => registration(email, password)}
                >
                    Войти
                </button>
            </div>

        </div>
    )
}

export default Registration