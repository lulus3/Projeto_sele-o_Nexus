import { ReactNode } from 'react'
import Styles from './Box.module.css'

interface IProps{
    children: ReactNode
}
export default function BoxCredential(props: IProps){
    return(
        <div className={Styles.boxContainerCredential}>
            {props.children}
        </div>
    )
}