import { ChangeEvent, useState } from "react";
import GeneralField from "../../components/loginGeneralField/GeneralField";
import BoxCredential from "../../components/box/BoxCredential";
import GeneralButton from "../../components/generalButton/GeneralButton";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigator = useNavigate()
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const handleNome = (event: ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    };
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
    const validateNome = (nome: string): boolean => {
        const re = nome==''?false:true;
        return re;
    };

    const handleRegister = async()=>{
        if (!validateNome(nome)) {
            alert('Por favor, insira um nome válido.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        if (!validateSenha(senha)) {
            alert('Por favor, insira uma senha válida.');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (response.ok) {
                alert("usuario cadastrado")
                navigator(`/login`);
            } else {
                alert('Erro ao cadatrar usuario');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
        }
    }

    return(
        <div>
            <BoxCredential>
                <div><h1>Cadastro</h1></div>
                <div style={{width:"80%", height:"20px", marginBlock: '10px'}}>
                    <GeneralField text="Nome" type="text" size={100} onChangeElement={handleNome}/>
                </div>
                <div style={{width:"80%", height:"20px", marginBlock: '10px'}}>
                    <GeneralField text="Email" type="email" size={100} onChangeElement={handleEmail}/>
                </div>
                <div style={{width:"80%", height:"20px", marginBlock: '10px'}}>
                    <GeneralField text="Senha" type="password" size={100} onChangeElement={handleSenha}/>
                </div>
                <div style={{width:"80%", height:"50px", marginBlock: '10px', display:'flex', justifyContent:'center'}}>
                    <GeneralButton onClickBtn={()=>navigator("/login")}>Logar</GeneralButton>
                    <GeneralButton onClickBtn={handleRegister}>Cadastrar</GeneralButton>
                </div>
            </BoxCredential>
        </div>
    );
}