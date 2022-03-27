import './file.scss'
import folder from '../../../../assets/img/folder.svg'
import file from '../../../../assets/img/file.svg'

const File = ({name, type, size, date}) => {
    return(
        <div className="file">
            <img src={type === 'dir' ? folder : file} alt="" className="file__img" />
            <div className="file__name">{name}</div>
            <div className="file__date">{date.slice(0, 10)}</div>
            <div className="file__size">{size}</div>
        </div>
    )
}

export default File