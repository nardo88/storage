import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../../redusers/uploadReducer'
import './uploader.scss'
import UploadFile from './UploadFile'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)

    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()
    return (
        isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <button 
                    className="uploader__close"
                    onClick={() => dispatch(hideUploader())}
                >x</button>
            </div>
            {
                files.map(item => <UploadFile key={item.id} {...item} />)
            }
        </div>
    )
}

export default Uploader