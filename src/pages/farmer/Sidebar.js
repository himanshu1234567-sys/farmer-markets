// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Sidebar = () => {
  return (
    <Nav
      className="col-md-2 d-none d-md-block bg-light sidebar"
      style={{ height: "100vh" }}
    >
      <div className="sidebar-sticky"></div>

      <Nav.Item>
        <Link to="/myProducts"> My Products</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/addProduct">Add</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="#">Sale History</Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
