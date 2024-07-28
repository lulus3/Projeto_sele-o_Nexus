import { ChangeEvent } from "react";
import Styles from './inputGenerelField.module.css'

interface IProps{
    onChangeElement?: (e:ChangeEvent<HTMLInputElement>)=> void,
    value?: string | number,
    type: string,
    text: string
}
export default function InputGeneralFieldTitulo(props: IProps){
    return(
        <div>
        <div className={Styles.inputContainer}>
            <label className={Styles.labelContainer}>{props.text}</label>
            <input className={Styles.inputContent} maxLength={130}
            type={props.type} onChange={props.onChangeElement} value={props.value}/>
        </div>
        </div>
    )
}