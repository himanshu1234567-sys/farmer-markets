import React, { Fragment, useContext } from "react";
import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { saveActivity } from "../../services/usersService";

function Header() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <Fragment>
      <Navbar bg='dark'  variant="dark">
        <Container>
          <Navbar.Brand href="#home" >Fomer Market</Navbar.Brand>
          {
                auth?.type==="user" &&  <input type="search" placeholder="search products"/>
                }
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {auth ? (
              <Fragment>
                <Navbar.Text>Signed in as: {auth.name}</Navbar.Text>&nbsp,

                <Nav.Link as={Link}  to="dashboard"> {auth?.type==="user" ? "All Products" : "My Products"}</Nav.Link>

                {/* <Nav.Link as={Link}  to="profile">My Profile</Nav.Link> */}

                {/* <Nav.Link as={Link}  to="myActivity">My Activity</Nav.Link> */}
             
               {
                auth?.type==="user" &&  <Nav.Link as={Link}  to="viewCart">View cart</Nav.Link>
               }
                <Button variant="outline-success" 
                 onClick={() => {
                  const confirmBox = window.confirm(
                    "Do you want to logout?"
                  )
                  if (confirmBox === true) {
                    logout()
                  }
                }}
                >
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="#"> About Us</Nav.Link>
                <Nav.Link as={Link} to="#">Our services</Nav.Link>
                <Nav.Link as={Link} to="#">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/login">farmers’ section</Nav.Link>
                <Nav.Link as={Link} to="/login">user section</Nav.Link>
              </Fragment>
            )}
          
          </Navbar.Collapse>
        
        </Container>
      </Navbar>
    </Fragment>
  );
}



export default Header;
