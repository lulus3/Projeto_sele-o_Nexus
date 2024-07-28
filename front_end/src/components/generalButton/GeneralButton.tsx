import { ReactNode } from "react"
import Styles from "./GeralButton.module.css"
interface IProps{
    onClickBtn: ()=>void,
    children?: ReactNode,
    type?: string
}

export default function GeneralButton(props: IProps){
    if (props.type == 'Delete'){
        return(
            <button className={Styles.buttonConteinerDelete} onClick={props.onClickBtn}>
                {props.children}
            </button>
        );
    }else if(props.type == 'Login'){
        return(
            <button className={Styles.buttonConteinerLogin} onClick={props.onClickBtn}>
                {props.children}
            </button>
        );
    }else{
        return(
            <button className={Styles.buttonConteiner} onClick={props.onClickBtn}>
                {props.children}
            </button>
        );
    }
}