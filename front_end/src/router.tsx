import { createBrowserRouter } from "react-router-dom";
import CalendarComponent from "./pages/calendar/calendar";
import CreateTask from "./pages/createTask/creatTask";
import ReadTask from "./pages/readTask/readTask";
import EditTask from "./pages/editTask/editTask";
import Login from "./pages/login/login";
import PrivateRoute from "./PrivateRouter";
import Register from "./pages/register/register";
import ErrorPage from "./pages/errorPage.tsx/erroPage";

export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/home",
        element: <PrivateRoute children={<CalendarComponent />} />
    },
    {
        path:'/createTask/:id',
        element: <PrivateRoute children={<CreateTask />}/>
    },
    {
        path:'/task/:id',
        element: <PrivateRoute children={<ReadTask />}/>
    },
    {
        path:'/editTask/:id',
        element: <PrivateRoute children={<EditTask />}/>
    },
    {
        path:'/errorPage',
        element: <ErrorPage/>
    }
])