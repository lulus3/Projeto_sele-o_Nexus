import { ChangeEvent } from "react";
import Styles from './inputGenerelField.module.css'

interface IProps{
    onChangeElement?: (e:ChangeEvent<HTMLTextAreaElement>)=> void,
    value?: string | number,
    text: string
}
export default function InputGeneralFieldDescricao(props: IProps){
    return(
        <div>
        <div className={Styles.inputContainer}>
            <label className={Styles.labelContainer}>{props.text}</label>
            <div>
                <textarea maxLength={1500} rows={15} cols={100} className={Styles.inputContent} style={{ resize: 'none' }} 
                onChange={props.onChangeElement} value={props.value}/>
            </div>
        </div>
        </div>
    )
}