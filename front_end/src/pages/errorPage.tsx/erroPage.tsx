import { useNavigate } from 'react-router-dom';
import styles from "./errorPage.module.css"

export default function ErrorPage (props:any) {
    const navigator = useNavigate();

    const handleGoBack = () =>{
        navigator('/home')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Oops! Algo deu errado.</h1>
            <p className={styles.message}>{props.erro || "Parece que algo deu errado. Por favor, tente novamente mais tarde."}</p>
            <button className={styles.button} onClick={handleGoBack}>Voltar para a Página Inicial</button>
        </div>
    );
};
