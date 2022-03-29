import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file'
import { addFile, setPOpupDisplay } from '../../redusers/fileReducer'
import './disk.scss'
import FileList from './fileList/FileList'
import Popup from './Popup'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const openPopup = () => {
        dispatch(setPOpupDisplay('flex'))
    }

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])
    return(
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back">Назад</button>
                <button className="disk__create" onClick={openPopup}>Создать папку</button>
            </div>
            <FileList />
            <Popup />
        </div>
    )
}

export default Disk