import { useDispatch, useSelector } from "react-redux"
import { deleteAvatar, uploadAvatar } from "../../actions/user"

const Profile = () => {

    const dispatch = useDispatch()
    const loader = useSelector(state => state.app.loader)


    const changeHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    if(loader){
        return (
            <div className='loader'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return(
        <div className="profile">
            <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
            <input accept="image/*" onChange={changeHandler} type="file" placeholder="Загрузить аватар"/>
        </div>
    )
}

export default Profile