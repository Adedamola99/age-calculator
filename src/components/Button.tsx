interface ButtonProps {
    label: string;
    onclick: () => void;
    disabled?: boolean;
}

const Button:React.FC<ButtonProps> = ({ label, onclick, disabled }) => {
    return (
        <button className="addList" onClick={onclick} disabled={disabled}>
            {label}
        </button>

    )
}

export default Button