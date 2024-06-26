import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {Context} from "../main";
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate()

  const handleLogout = async () => {
    await axios
      .get("https://vercel.com/sandeshs-projects-5485184f/hospital-management-backend/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoLogin = async () => {
    navigateTo("/login")
  };
  return (
    <nav className="container">
      <div className="logo">SandyCare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appoinment"}>Appinmnets</Link>
          <Link to={"/about"}>About Us</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={gotoLogin}>
            login
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
           <GiHamburgerMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
