import { useSelector } from 'react-redux'
import './filelist.scss'
import File from './file/File'
const FileList = () => {
    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.view)

    if(fileView === 'list'){
        return(
            <div className="filelist">
                <div className="filelist__header">
                    <div className="filelist__name name">Название</div>
                    <div className="filelist__name date">Дата</div>
                    <div className="filelist__name size">размер</div>
                </div>
                {
                    files.length ? 
                    files.map(file => <File  key={file._id} {...file} />)
                    : <div className='filelist__empty'>В данной директории нет файлов</div>   
                }
            </div>
        )
    }

    if(fileView === 'plate'){
        return(
            <div className="filePlate">
                
                {
                    files.length ? 
                    files.map(file => <File  key={file._id} {...file} />)
                    : <div className='filelist__empty'>В данной директории нет файлов</div>   
                }
            </div>
        )
    }
    
}

export default FileList