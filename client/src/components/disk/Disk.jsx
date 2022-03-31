import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file'
import { setCurrentDir, setPOpupDisplay } from '../../redusers/fileReducer'
import './disk.scss'
import FileList from './fileList/FileList'
import Popup from './Popup'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    const openPopup = () => {
        dispatch(setPOpupDisplay('flex'))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId)) 
    }

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])
    return(
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back" onClick={backClickHandler}>Назад</button>
                <button className="disk__create" onClick={openPopup}>Создать папку</button>
            </div>
            <FileList />
            <Popup />
        </div>
    )
}

export default Disk