import { ReactNode } from 'react'
import Styles from './generelField.module.css'

interface IProps{
    value?: string | number,
    text: ReactNode
}
export default function GeneralFieldStatus(props: IProps){
    return(
        <div>
        <div className={Styles.inputContainerStatus}>
            <label className={Styles.labelContainerStatus}>{props.text}</label>
            <h2 className={Styles.inputContentStatus}>{props.value}</h2>
        </div>
        </div>
    )
}