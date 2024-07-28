import { ReactNode } from 'react'
import Styles from './generelField.module.css'

interface IProps{
    value?: string | number,
    text: ReactNode
}
export default function GeneralFieldDescricao(props: IProps){
    return(
        <div>
        <div className={Styles.inputContainer}>
            <label className={Styles.labelContainer}>{props.text}</label>
            <div>
                <text className={Styles.inputContentDescricao}>{props.value}</text>
            </div>
        </div>
        </div>
    )
}