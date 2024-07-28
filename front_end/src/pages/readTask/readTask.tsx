import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/box/Box";
import { useEffect, useState } from "react";
import GeneralButton from "../../components/generalButton/GeneralButton";
import GeneralFieldTitulo from "../../components/readGeneralField/generalFieldTitulo";
import GeneralFieldData from "../../components/readGeneralField/generalFieldData";
import GeneralFieldStatus from "../../components/readGeneralField/generalFieldStatus";
import GeneralFieldDescricao from "../../components/readGeneralField/generalFieldDescricao";

export default function ReadTask(){
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const navigator = useNavigate();
    const [titulo, setTitulo] = useState<string>();
    const [data, setData] = useState<Date>();
    const [status, setStatus] = useState<string>();
    const [descricao, setDescricao] = useState<string>();

    const handleEdit = () => {
        navigator(`/editTask/${id}`);
      };

    const handleDelete = async ()=>{
        fetch(`http://localhost:8080/tarefas/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            alert(`Tarefa Deletada com sucesso`)
            navigator("/home")
        })
        .catch(error => {
            alert(error)
            console.log(error);
        });
    }

    useEffect(() => {
        fetch(`http://localhost:8080/tarefas/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                navigator("/errorPage");
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
            setData(new Date(data.data));
            setStatus(data.status);
            setDescricao(data.descricao);
        })
        .catch(error => {
            console.log(error);
            navigator("/errorPage");
        });
    }, []);
    return(
        <div>
            <Box>
                <div style={{width:"20%", height:"5vw",left:'20%', display:'flex', alignItems:'center', position:'absolute'}}>
                            <GeneralButton onClickBtn={()=>{navigator("/home")}}>voltar</GeneralButton>
                    </div>
                <div style={{maxWidth:'60%',display:"flex", flexDirection:"row", justifyContent:'center'}}>
                    <GeneralFieldTitulo value={titulo}/>
                </div>
                <div style={{width: '85%', height: '60px', marginBlock: '10px', display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <GeneralFieldData text='Data' value={data}/>
                    <GeneralFieldStatus text='Status' value={status}/>
                </div>
                <div style={{width: '85%', marginBlock: '10px', }}>
                    <GeneralFieldDescricao text='Descrição' value={descricao}/>
                </div>
                <div style={{width: '85%', height: '50px', marginBlock: '10px', display:'flex', justifyContent:'space-around'}}>
                    <GeneralButton onClickBtn={()=>{
                        handleEdit();
                    }}>Editar</GeneralButton>
                    <GeneralButton type="Delete" onClickBtn={()=>{
                        handleDelete();
                    }}>Deletar</GeneralButton>
                </div>
            </Box>
        </div>
    );
}