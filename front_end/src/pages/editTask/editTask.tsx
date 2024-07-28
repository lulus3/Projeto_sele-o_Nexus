import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/box/Box";
import GeneralButton from "../../components/generalButton/GeneralButton";
import GeneralFieldTitulo from "../../components/createGeneralField/inputGeneralFieldTitulo";
import GeneralFieldData from "../../components/createGeneralField/inputGeneralFieldData";
import GeneralFieldStatus from "../../components/createGeneralField/inputGeneralFieldStatus";
import GeneralFieldDescricao from "../../components/createGeneralField/inputGeneralFieldDescricao";
import { ChangeEvent, useEffect, useState } from "react";

export default function EditTask(){
    const navigator = useNavigate()
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const [titulo, setTitulo] = useState<string>();
    const [data, setData] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [descricao, setDescricao] = useState<string>();

    const handleTitulo = (event?: ChangeEvent<HTMLInputElement>) => {
        setTitulo(event?.target.value);
    };
    const handleData = (event?: ChangeEvent<HTMLInputElement>) => {
        setData(event?.target.value);
    };
    const handleStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };
    const handleDeescricao = (event?: ChangeEvent<HTMLTextAreaElement>) => {
        setDescricao(event?.target.value);
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
            const response = await fetch(`http://localhost:8080/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo,
                data,
                status,
                descricao,
                perfilId:userId,
            }),
            });

            if (!response.ok) {
            throw new Error('Erro ao enviar a requisição');
            }

            alert('Tarefa editada com sucesso!');
            navigator('/home');
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao cadastrar a tarefa.');
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/tarefas/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            if (data.perfilId != userId){
                navigator("/errorPage");
                throw new Error('Erro na requisição: Tentativa de acessar dados sensivei');
            }
            setTitulo(data.titulo);
            setData(data.data);
            setStatus(data.status);
            setDescricao(data.descricao);
        })
        .catch(error => {
            navigator("/errorPage");
            console.log(error);
        });
    }, []);

    return(
        <div>
            <Box>
                <div style={{width:'85%',display:"flex", flexDirection:"row"}}>
                    <div style={{width:"20%", height:"8vw", display:'flex', alignItems:'center'}}>
                        <GeneralButton onClickBtn={()=>{navigator(-1)}}>voltar</GeneralButton>
                    </div>
                    <h1>Edite a sua tarefa</h1>
                </div>
                <div style={{width: '85%', height: '30px', marginBlock: '10px'}}>
                    <GeneralFieldTitulo type='text' text='Titulo' onChangeElement={handleTitulo} value={titulo}/>
                </div>
                <div style={{width: '85%', height: '30px', marginBlock: '10px', display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <GeneralFieldData type='datetime-local' text='Data' onChangeElement={handleData} value={data}/>
                    <GeneralFieldStatus text='Status' onChangeElement={handleStatus} value={status} option={status}/>
                </div>
                <div style={{width: '85%', marginBlock: '10px'}}>
                    <GeneralFieldDescricao text='Descrição' onChangeElement={handleDeescricao} value={descricao}/>
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