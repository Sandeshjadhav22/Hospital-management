import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Messages from "./components/Messages"
import Doctors from "./components/Doctors"
import AddNewDoctors from "./components/AddNewDoctor"
import AddNewAdmin from "./components/AddNewAdmin"
import Sidebar from "./components/Sidebar"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Context} from "./main"
import axios from"axios"
import "./App.css"


const App = () => {

  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://hospital-management-backend-seven.vercel.app/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctor/addnew' element={<AddNewDoctors/>}/>
        <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
    </>
  )
}

export default App