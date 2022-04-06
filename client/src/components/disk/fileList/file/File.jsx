import './file.scss'
import folder from '../../../../assets/img/folder.svg'
import file from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../redusers/fileReducer'
import { deleteFile, downloadFile } from '../../../../actions/file'
import downloadIcon from '../../../../assets/img/download.svg'
import deleteIcon from '../../../../assets/img/delete.svg'
import getSize from '../../../../utils/getSize'

const File = ({ name, type, size, date, _id }) => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const openDirHandler = (type) => {
        if (type === 'dir') {
            dispatch(setCurrentDir(_id))
            dispatch(pushToStack(currentDir))
        }

    }

    const downLoadHandler = (e) => {
        e.stopPropagation()
        downloadFile(_id, name)
    }

    const deleteFileHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(_id))
    }

    return (
        <div className="file" onClick={() => openDirHandler(type)}>
            <img src={type === 'dir' ? folder : file} alt="" className="file__img" />
            <div className="file__name">{name}</div>
            <div className="file__date">{date.slice(0, 10)}</div>
            <div className="file__size">{getSize(size)}</div>
            {type !== 'dir' &&
                <button onClick={(e) => downLoadHandler(e)} className="file__btn file__download">
                    <img src={downloadIcon} alt="doenload" />
                </button>}
            <button onClick={(e) => deleteFileHandler(e)} className="file__btn file__delete">
                <img src={deleteIcon} alt="delete" />
            </button>
        </div>
    )
}

export default File