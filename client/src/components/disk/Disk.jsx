import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import { setCurrentDir, setFileView, setPOpupDisplay } from '../../redusers/fileReducer'
import './disk.scss'
import FileList from './fileList/FileList'
import Popup from './Popup'
import Uploader from './upload/Uploader'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [drugEnter, setDrugEnter] = useState(false)
    const [sort, setSort] = useState('type')

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
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    if(loader){
        return (
            <div className='loader'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
         !drugEnter ? (
            <div className='disk' onDragEnter={dragEnterHAndler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHAndler}>
                <div className="disk__btns">
                    <button className="disk__back" onClick={backClickHandler}>??????????</button>
                    <button className="disk__create" onClick={openPopup}>?????????????? ??????????</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">?????????????????? ????????</label>
                        <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id="disk__upload-input" className="disk__upload-input" />
                    </div>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk__select'>
                        <option value="name">???? ??????????</option>
                        <option value="type">???? ????????</option>
                        <option value="date">???? ????????</option>
                    </select>
                    <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
                    <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
                </div>
                <FileList />
                <Popup />
                <Uploader />
            </div>)
            : 
            ( <div className="drop-area"onDragEnter={dragEnterHAndler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHAndler} onDrop={dropHandler}>
                ???????????????????? ?????????? ????????
            </div> )
    )
}

export default Disk