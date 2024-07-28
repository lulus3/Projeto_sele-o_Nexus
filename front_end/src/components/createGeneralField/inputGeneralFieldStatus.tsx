import { ChangeEvent } from "react";
import Styles from './inputGenerelField.module.css'

interface IProps{
    onChangeElement?: (e:ChangeEvent<HTMLSelectElement>)=> void,
    value?: string | number,
    text: string,
    option: string | undefined,
}
export default function InputGeneralFieldStatus(props: IProps){
    return(
        <div>
        <div className={Styles.inputContainerStatus}>
            <label className={Styles.labelContainerStatus}>{props.text}</label>
            <select className={Styles.inputContent} value={props.value} onChange={props.onChangeElement}>
                <option value="PENDENTE">Pendente</option>
                <option value="REALIZADA">Realizada</option>
            </select>
        </div>
        </div>
    )
}