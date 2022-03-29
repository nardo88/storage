import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/file'
import { setPOpupDisplay } from '../../redusers/fileReducer'
import Input from '../input/input'
import './popup.scss'

const Popup = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const displayPopup = useSelector(state => state.files.displayPopup)
    const currentDir = useSelector(state => state.files.currentDir)
    const close = () => {
        dispatch(setPOpupDisplay('none'))

    }
    
    const create = () => {
        dispatch(createDir(currentDir, value))
        setValue('')
        close()
    }
    return (
        <div className="popup" style={{display: displayPopup}} onClick={close}>
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую директорию</div>
                    <button className="popup__close" onClick={close}>Х</button>
                </div>
                <Input value={value} onChange={setValue} type="text" placeholder={"Укажите название папки"} />
                <div className="popup__btn">
                    <button className="popup__send" onClick={create}>Создать</button>
                </div>
            </div>
        </div>
    )
}

export default Popup