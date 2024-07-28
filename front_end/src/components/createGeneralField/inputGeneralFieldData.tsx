import { ChangeEvent } from "react";
import Styles from './inputGenerelField.module.css'

interface IProps{
    onChangeElement?: (e:ChangeEvent<HTMLInputElement>)=> void,
    value?: string | number,
    type: string,
    text: string
}
export default function InputGeneralFieldData(props: IProps){
    return(
        <div>
            <div className={Styles.inputContainerData}>
            <label className={Styles.labelContainerData}>{props.text}</label>
            <input className={Styles.inputContent}
            type={props.type} onChange={props.onChangeElement} value={props.value}/>
        </div>
        </div>
    )
}