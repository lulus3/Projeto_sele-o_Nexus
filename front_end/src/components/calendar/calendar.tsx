import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "./calendar.css"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IItens{
  id: bigint,
  titulo: string,
  data: Date,
  status: string,
  descricao: string,
  perfilId: bigint
}

export default function CalendarComponent(){
  const id = localStorage.getItem('userId');
  const navigator = useNavigate()
  const [listaTarefas, setTarefas] = useState<IItens[]>([]);

  const handleEventClick = (info: any) => {
    navigator(`/task/${info.event.id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/tarefas?perfilId=${id}`, {
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
      const lista:any[] = data.content;
      const tarefasConvertidas: IItens[] = lista.map(item => ({
        id: BigInt(item.id),
        titulo: item.titulo,
        data: new Date(item.data),
        status: item.status,
        descricao: item.descricao,
        perfilId: BigInt(item.perfilId)
      }));
      setTarefas(tarefasConvertidas);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const eventos = listaTarefas.map(tarefa => {
    const today = new Date();
    const data = new Date(tarefa.data);
    let estilo = 'event-tipo-1';
    if (data < today && tarefa.status == 'PENDENTE'){
      estilo = 'event-tipo-3';
    }else if(data > today && tarefa.status == 'PENDENTE' ){
      estilo = 'event-tipo-4';
    }else if(tarefa.status == 'REALIZADA' ){
      estilo = 'event-tipo-2';
    }
    
    return {
      id: tarefa.id.toString(),
      title: tarefa.titulo,
      start: tarefa.data.toISOString(),
      end: tarefa.data.toISOString(),
      description: tarefa.descricao,
      className: estilo,
      fontSize: 2,
    };
  });
  return (
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        locale={"pt-br"}
        fixedWeekCount={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        eventClick={handleEventClick}
    />
  );
};