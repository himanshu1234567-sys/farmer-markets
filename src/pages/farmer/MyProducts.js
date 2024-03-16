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
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/authContext";
import { getUsers } from "../../services/usersService";
import action from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action/products";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const { auth, saveLogin } = React.useContext(AuthContext);
  const products = useSelector((state) => state?.productReducer?.products);
  console.log("🚀 ~ MyProducts ~ products:", products);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("🚀 ~ MyProducts ~ auth:", auth?.userCart?.products);

    dispatch(getProducts(auth?.userCart?.products));
    const products = JSON.parse(localStorage.getItem("allProducts")) || [];
    console.log("🚀 ~ useEffect ~ products:", products);
    setMyProducts(products);
  }, [auth, dispatch]);

  const deleteProduct = (id) => {
    let products = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Filter out the product with the given ID
    const updatedProducts = products.filter((product) => product.id !== id);

    setMyProducts(updatedProducts);
    // Update local storage with the filtered products
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
  };

  const addToCart = (pId, productName) => {
    // product id , user id , product quantity added by user product name  ,


    let newAuthObj = { ...auth };

    if (newAuthObj?.userCart?.products.length > 0) {
      const productIndex = newAuthObj?.userCart?.products?.findIndex(
        (product) => product?.productId === pId
      );
      if (productIndex !== -1) {
        newAuthObj.userCart.products[productIndex].quantity += 1;
      } else {
        const cartObj = {
          userEmail: auth?.email,
          productId: pId,
          quantity: 1,
          productName: productName,
          id: Math.floor(Math.random() * 100)
        };
        newAuthObj.userCart.products.push(cartObj);
      }
    } else {
      const cartObj = {
        userEmail: auth?.email,
        productId: pId,
        quantity: 1,
        productName: productName,
        id: 1,
      };
      newAuthObj.userCart.products.push(cartObj);
    }

    const allusers = getUsers();
    const results = allusers.filter(function (entry) {
      return entry.email !== auth.email;
    });

    const newRes = results;
    newRes.push(newAuthObj);
    console.log("🚀 ~ addToCart ~ newRes:", newRes);

    localStorage.setItem("Users", JSON.stringify(newRes));

    dispatch(getProducts(newAuthObj?.userCart?.products));

    saveLogin(newAuthObj);
    alert("prodiuct added to cart");
  };
  return (
    <Container fluid>
      <Container className="mt-4">
        <h1>Welcome to Farmer's Market</h1>

        {myProducts?.length === 0 ? (
          <h1>No Products</h1>
        ) : (
          <>
            {auth?.type !== "user" && <h2>My Products:</h2>}
            <Row xs={1} md={3} className="g-4">
              {myProducts.map((product, index) => (
                <Col key={index}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{product.productName}</Card.Title>
                      <Card.Text>Quantity : {product.quantity}</Card.Text>
                      {auth?.type !== "user" ? (
                        <>
                          <Link
                            to={`/editProduct/${product.id}`}
                            variant="danger"
                            size="sm"
                            className="btn btn-warning btn-sm me-5"
                          >
                            Edit
                          </Link>
                          <button onClick={() => deleteProduct(product.id)}>
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            addToCart(product.id, product.productName)
                          }
                        >
                          Add To Cart
                        </button>
                      )}
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

export default MyProducts;
