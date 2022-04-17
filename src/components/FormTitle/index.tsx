import './FormTitle.css';

type FormTitleProps = {
    title: string,
    text: string
}

export const FormTitle: React.FC<FormTitleProps> = ( props ) => {
    return (
        <div className="formTitle">
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </div>
    )
}