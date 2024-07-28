import { ChangeEvent } from "react"
import Styles from "./GeneralField.module.css"

interface IProps{
    onChangeElement?: (e:ChangeEvent<HTMLInputElement>)=> void,
    value?: string | number,
    type: string,
    text: string,
    size: number
}


export default function GeneralField(props: IProps){
    return(
        <div className={Styles.inputContainer}>
            <label className={Styles.labelContainer}>{props.text}</label>
            <input className={Styles.inputContent} maxLength={props.size}
            type={props.type} onChange={props.onChangeElement} value={props.value}/>
        </div>
    );
}