import React, { useState, useEffect } from 'react';
import Sidebar from '../farmer/Sidebar';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from 'react-router-dom';

function EditProduct() {
    const { productId } = useParams();
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductDetails(productId);
    }, [productId]);

    const fetchProductDetails = (productId) => {
        // Retrieve products from local storage
        const products = JSON.parse(localStorage.getItem("allProducts")) || [];

        // Find the product with the matching productId
        const product = products.find(product => product.id === parseInt(productId));

        // If the product is found, update state with its details
        if (product) {
            setProductName(product.productName);
            setQuantity(product.quantity);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Retrieve products from local storage
        let products = JSON.parse(localStorage.getItem("allProducts")) || [];

        // Find the index of the product with the matching productId
        const productIndex = products.findIndex(product => product.id === parseInt(productId));

        // If the product index is found, update its details
        if (productIndex !== -1) {
            products[productIndex] = { id: parseInt(productId), productName: productName, quantity: quantity };

            // Save the updated products array back to local storage
            localStorage.setItem("allProducts", JSON.stringify(products));
            // setShowAlert(true);
            alert("Product updated successfully");
            setProductName("");
            setQuantity("");
            navigate("/dashboard");

            // setTimeout(() => setShowAlert(false), 3000);
        } else {
            console.error("Product not found");
        }
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
                        <h2>Edit Product</h2>
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
                                Update Product
                            </Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Product updated successfully!
            </Alert>
        </Container>
    );
}

export default EditProduct;
