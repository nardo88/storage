import './input.scss'

const Input = ({type, placeholder, value, onChange}) => {

    return (
        <input value={value} onChange={(e) => onChange(e.target.value)} type={type} placeholder={placeholder} />
    )
}

export default Input