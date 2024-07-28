import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/box/Box";
import GeneralButton from "../../components/generalButton/GeneralButton";
import GeneralFieldData from "../../components/createGeneralField/inputGeneralFieldData";
import GeneralFieldStatus from "../../components/createGeneralField/inputGeneralFieldStatus";
import GeneralFieldDescricao from "../../components/createGeneralField/inputGeneralFieldDescricao";
import { ChangeEvent, useState } from "react";
import InputGeneralFieldTitulo from "../../components/createGeneralField/inputGeneralFieldTitulo";

export default function CreateTask(){
    const {id} = useParams();
    const navigator = useNavigate();
    const [titulo, setTitulo] = useState<string>();
    const [data, setData] = useState<string>();
    const [status, setStatus] = useState<string>("PENDENTE");
    const [descricao, setDescricao] = useState<string>();

    const handleTitulo = (event: ChangeEvent<HTMLInputElement>) => {
        setTitulo(event.target.value);
    };
    const handleData = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value);
    };
    const handleStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };
    const handleDeescricao = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescricao(event.target.value);
    };

    const validateForm = (): boolean => {
        if (!titulo|| titulo=="" || !data || data=="" || !status || status=="" || !descricao || descricao=="") {
          alert('Todos os campos devem ser preenchidos.');
          return false;
        }
        return true;
      };
    
    const handleSave = async () => {
    if (!validateForm()) {
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo,
            data,
            status,
            descricao,
            perfilId:id,
        }),
        });

        if (!response.ok) {
        throw new Error('Erro ao enviar a requisição');
        }

        alert('Tarefa cadastrada com sucesso!');
        navigator(-1);
    } catch (error) {
        console.error('Erro:', error);
        navigator("/errorPage");
    }
    };
    return(
        <div>
            <Box>
                <div style={{width:'85%',display:"flex", flexDirection:"row"}}>
                    <div style={{width:"20%", height:"8vw", display:'flex', alignItems:'center'}}>
                        <GeneralButton onClickBtn={()=>{navigator(-1)}}>voltar</GeneralButton>
                    </div>
                    <h1>Crie sua nova tarefa</h1>
                </div>
                <div style={{width: '85%', height: '30px', marginBlock: '10px'}}>
                    <InputGeneralFieldTitulo type='text' text='Titulo' onChangeElement={handleTitulo}/>
                </div>
                <div style={{width: '85%', height: '30px', marginBlock: '10px', display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <GeneralFieldData type='datetime-local' text='Data' onChangeElement={handleData}/>
                    <GeneralFieldStatus text='Status' onChangeElement={handleStatus} option={status}/>
                </div>
                <div style={{width: '85%', marginBlock: '10px'}}>
                    <GeneralFieldDescricao text='Descrição' onChangeElement={handleDeescricao}/>
                </div>
                <div style={{width: '85%', height: '30px', marginBlock: '10px'}}>
                    <GeneralButton onClickBtn={()=>{
                        handleSave();
                    }}>Salvar</GeneralButton>
                </div>
            </Box>
        </div>
    );
}