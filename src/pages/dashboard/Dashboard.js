import React, { Fragment, useEffect } from "react";
import Sidebar from "../farmer/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import MyProducts from "../farmer/MyProducts";
import { getUsers } from "../../services/usersService";
import { AuthContext } from "../../context/authContext";
import { useSelector } from "react-redux";

// import { Container } from './styles';

const Dashboard = () => {
  const { auth } = React.useContext(AuthContext);

  console.log("🚀 ~ Dashboard ~ auth:", auth);

  return (
    <Container fluid>
      {auth?.type === "user" ? (
        <MyProducts />
      ) : (
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <MyProducts />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
