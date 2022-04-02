import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import { setCurrentDir, setPOpupDisplay } from '../../redusers/fileReducer'
import './disk.scss'
import FileList from './fileList/FileList'
import Popup from './Popup'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [drugEnter, setDrugEnter] = useState(false)

    const openPopup = () => {
        dispatch(setPOpupDisplay('flex'))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHAndler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDrugEnter(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        e.stopPropagation()
        setDrugEnter(false)
    }

    function dropHandler(e){
        e.preventDefault()
        e.stopPropagation()
        const files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDrugEnter(false)

    }

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])
    return (
         !drugEnter ? (
            <div className='disk' onDragEnter={dragEnterHAndler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHAndler}>
                <div className="disk__btns">
                    <button className="disk__back" onClick={backClickHandler}>Назад</button>
                    <button className="disk__create" onClick={openPopup}>Создать папку</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id="disk__upload-input" className="disk__upload-input" />
                    </div>
                </div>
                <FileList />
                <Popup />
            </div>)
            : 
            ( <div className="drop-area"onDragEnter={dragEnterHAndler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHAndler} onDrop={dropHandler}>
                Перетащите файлы сюда
            </div> )
    )
}

export default Disk