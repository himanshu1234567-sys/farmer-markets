import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserLandingPage = () => {
  // Dummy products data with images
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    console.log("🚀 ~ useEffect ~ products:", products);
    setMyProducts(products);
  }, []);


  return (
    <Container fluid>
    <Container className="mt-4">
      <h1>Welcome to Farmer's Market</h1>

      {myProducts?.length === 0 ? (
        <h1>No Products</h1>
      ) : (
        <>
          <h2>My Products:</h2>
          <Row xs={1} md={3} className="g-4">
            {myProducts.map((product, index) => (
              <Col key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>Quantity : {product.quantity}</Card.Text>
                 
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  </Container>
  );
};

export default UserLandingPage;
