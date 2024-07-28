import { ReactNode } from 'react'
import Styles from './generelField.module.css'

interface IProps{
    value: Date | undefined,
    text: ReactNode
}
export default function GeneralFieldData(props: IProps){
    return(
        <div>
        <div className={Styles.inputContainerData}>
            <label className={Styles.labelContainerData}>{props.text}</label>
            <h2 className={Styles.inputContentData}
            >{props.value?.getDay()}/{props.value?.getMonth()}/{props.value?.getFullYear()} {props.value?.getHours()}:{props.value?.getMinutes()}</h2>
        </div>
        </div>
    )
}