import { ChangeEvent, useState } from "react";
import GeneralField from "../../components/loginGeneralField/GeneralField";
import BoxCredential from "../../components/box/BoxCredential";
import GeneralButton from "../../components/generalButton/GeneralButton";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigator = useNavigate()
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleSenha = (event: ChangeEvent<HTMLInputElement>) => {
        setSenha(event.target.value);
    };

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const validateSenha = (senha: string): boolean => {
        const re = senha==''?false:true;
        return re;
    };
    

    const handleLogin = async()=>{
        if (!validateEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        if (!validateSenha(senha)) {
            alert('Por favor, insira uma senha válida.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                const data = await response.json();
                const { jwt, id } = data;
                localStorage.setItem('token', jwt);
                localStorage.setItem('userId', id)
                navigator(`/home`);
            } else {
                alert('Email ou senha incorretos.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    }

    return(
        <div>
            <BoxCredential>
                <div><h1>Login</h1></div>
                <div style={{width:"80%", height:"20px", marginBlock: '10px'}}>
                    <GeneralField text="Email" type="email" size={100} onChangeElement={handleEmail}/>
                </div>
                <div style={{width:"80%", height:"20px", marginBlock: '10px'}}>
                    <GeneralField text="Senha" type="password" size={100} onChangeElement={handleSenha}/>
                </div>
                <div style={{width:"80%", height:"50px", marginBlock: '10px', display:'flex', justifyContent:'center'}}>
                    <GeneralButton onClickBtn={handleLogin} type="Login">Entrar</GeneralButton>
                    <GeneralButton onClickBtn={()=>navigator('/register')}>Cadastrar</GeneralButton>
                </div>
            </BoxCredential>
        </div>
    );
}