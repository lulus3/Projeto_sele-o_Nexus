import "./calendar.css"
import CalendarComponent from '../../components/calendar/calendar';
import GeneralButton from "../../components/generalButton/GeneralButton";
import { useNavigate } from "react-router-dom";

export default function Calendar(){
  const id = localStorage.getItem('userId');
  const navigator = useNavigate();

  return (
    <div>
      <div className='calendarContainer'>
          <CalendarComponent/>
      </div>
      <div className='buttonsContainer'>
      <GeneralButton onClickBtn={()=>{navigator(`/createTask/${id}`)}}>Criar Nova Tarefa</GeneralButton>
      <GeneralButton onClickBtn={()=>{
        navigator(`/login`);
        localStorage.clear()
        }}>Log Out</GeneralButton>
      </div>
    </div>
  );
};