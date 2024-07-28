import Styles from './generelField.module.css'

interface IProps{
    value?: string | number,
}
export default function GeneralFieldTitulo(props: IProps){

    return(
        <div>
        <div className={Styles.inputContainer}>
            <h1 className={Styles.inputContentTitulo}>{props.value}</h1>
        </div>
        </div>
    )
}