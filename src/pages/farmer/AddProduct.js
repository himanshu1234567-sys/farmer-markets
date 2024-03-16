import React, { Fragment, useState } from "react";
import Sidebar from "../farmer/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import MyProducts from "../farmer/MyProducts";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { Container } from './styles';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the form, e.g., sending data to backend or updating state
    console.log("Product Name:", productName);
    console.log("Quantity:", quantity);

    let id;
    // Retrieve existing products from localStorage or initialize an empty array
    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    console.log("🚀 ~ handleSubmit ~ products:", products);

    if (products?.length > 0) {
      id = products.length + 1;
    } else {
      id = 1;
    }
    const newProductObject = {
      productName: productName,
      quantity: quantity,
      id: id,
    };

    // Add the new product to the existing products array
    products.push(newProductObject);

    // Save the updated products array back to localStorage
    localStorage.setItem("allProducts", JSON.stringify(products));
    // setShowAlert(true);

    // setTimeout(() => setShowAlert(false), 3000);
    alert("product added successfully!");

    // // Optionally, you can reset the form fields after submission
    // setProductName("");
    // setQuantity("");

    // console.log("New product added successfully:", newProductObject);

    // console.log(newDetails);
    setProductName("");
    setQuantity("");
    navigate("/dashboard");
    
  };
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2}>
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={6}>
          <Container>
            <h2>Add New Product</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Product
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        Product added successfully!
      </Alert>
    </Container>
  );
}

export default AddProduct;
