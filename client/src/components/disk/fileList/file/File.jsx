import './file.scss'
import folder from '../../../../assets/img/folder.svg'
import file from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { pushToStack, setCurrentDir } from '../../../../redusers/fileReducer'

const File = ({name, type, size, date, _id}) => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir )

    const openDirHandler = () => {
        dispatch(setCurrentDir(_id))
        dispatch(pushToStack(currentDir))

    }

    return(
        <div className="file" onClick={type === 'dir' && openDirHandler}>
            <img src={type === 'dir' ? folder : file} alt="" className="file__img" />
            <div className="file__name">{name}</div>
            <div className="file__date">{date.slice(0, 10)}</div>
            <div className="file__size">{size}</div>
        </div>
    )
}

export default File