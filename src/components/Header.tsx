const Header:React.FC<{ title: string }> = ({title}) => {
    return (
        <div>
            <p className="header-title">{title}</p>
        </div>
    )
}

export default Header