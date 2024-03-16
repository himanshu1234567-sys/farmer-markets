import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const products = useSelector((state) => state?.productReducer?.products);

  return (
    <Container fluid>
      <Container className="mt-4">
        <h1>My Cart</h1>

        {products?.length === 0 ? (
          <h1>No Products</h1>
        ) : (
          <>
            <Row xs={1} md={3} className="g-4">
              {products.map((product, index) => (
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
      {products?.length != 0 &&
      <div className="d-flex justify-content-center">
        <button className="btn btn-success">Checkout</button>
      </div>
      }
    </Container>
  );
};

export default Cart;
