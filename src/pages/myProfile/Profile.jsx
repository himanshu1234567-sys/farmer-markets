import React, { Fragment, useContext, useState } from "react";
import { Row, Col, Button, Container, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "../../context/authContext";
import stateCountry from "state-country";
import { toast } from "react-toastify";
import { saveActivity } from "../../services/usersService";
import DeleteModal from "./DeleteModal";
function Profile() {
  // state for delete modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { auth, setAuth } = useContext(AuthContext);
  const [personal, setPersonal] = useState({
    name: auth.name,
    email: auth.email,
    phone_number: auth.phone_number,
  });
  const [address, setAddress] = useState({
    city: auth.city,
    state: auth.state,
    country: auth.country,
  });
  const [userPassword, setUserPassword] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const countriesList = stateCountry.getAllCountries();
  const stateList = stateCountry.getAllStatesInCountry(address.country);

  var users = JSON.parse(localStorage.getItem("Users")) || [];

  const updatePersonal = (e) => {
    e.preventDefault();
    const index = users.findIndex(function (entry) {
      return entry.email === auth.email;
    });
    if (index !== -1) {
      console.log(users[index]);
      users[index] = {
        ...users[index],
        name: personal.name,
        email: personal.email,
        phone_number: personal.phone_number,
      };
      var updatePersonal = localStorage.setItem("Users", JSON.stringify(users));
      console.log(updatePersonal);
      toast.success("User Personal details updated successfully");
      saveActivity("updated personal details");
    }
  };
  const updateAddress = (e) => {
    e.preventDefault();
    const index = users.findIndex(function (entry) {
      return entry.email === auth.email;
    });
    if (index !== -1) {
      console.log(users[index]);
      users[index] = {
        ...users[index],
        city: address.city,
        country: address.country,
        state: address.state,
      };
      var updateAddress = localStorage.setItem("Users", JSON.stringify(users));

      console.log(updateAddress);
      saveActivity("updated  Address");
      toast.success("User Address updated successfully");
    }
  };
  const updatePassword = (e) => {
    e.preventDefault();
    const passIndex = users.findIndex(function (entry) {
      return entry.email === localStorage.getItem("email");
    });

    if (passIndex == -1) {
      saveActivity("Cant able to change password");
    }

    // const index = users.findIndex(function (entry) {
    //   return entry.email === auth.email;
    // });

    if (passIndex !== -1) {
      if (users[passIndex].password === userPassword.password) {
        toast.error("Password doesnot Match");
        saveActivity("Cant able to change pasword");
        return false;
      }
      if (userPassword.new_password !== userPassword.confirm_password) {
        toast.error("confirm password doesnot Match");
        saveActivity("Cant able to change pasword");

        return false;
      }
      users[passIndex] = {
        ...users[passIndex],
        password: userPassword.confirm_password,
      };
      var updatePassword = localStorage.setItem("Users", JSON.stringify(users));
      saveActivity("Password updated");

      console.log(updatePassword);
      toast.success("User Password updated successfully");
    }
  };

  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleUserPasswordChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  const deleteAccount = (val) => {
    console.log(val);
    if (val) {
      let users = JSON.parse(localStorage.getItem("Users"));
      const index = users.findIndex(function (entry) {
        return entry.email === auth.email;
      });

      if (index !== -1) {
        users.splice(index, 1);
        saveActivity("Account Deleted");
        localStorage.setItem("Users", JSON.stringify(users));
        localStorage.setItem("user_session", null);
        localStorage.setItem("auth", false);
        setAuth(false);
        toast.success("Account deleted successfully");
      }
    }
  };

  
  return (
    <Fragment>
      <Container className="m-5 text-center">
        <Row>
          <Col>
            <Form onSubmit={updatePersonal}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Personal</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your Email address</Form.Label>
                    <Form.Control
                      name="name"
                      onChange={handlePersonalChange}
                      value={personal.name}
                      type="text"
                      placeholder="Enter name"
                    />
                  </Form.Group>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="email"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="email"
                      value={personal.email}
                      onChange={handlePersonalChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="phone"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="phone"
                      onChange={handlePersonalChange}
                      value={personal.phone_number}
                    />
                  </InputGroup>
                  <Button type="submit" variant="success">
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>

          <Col>
            <Form onSubmit={updateAddress}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Address</Card.Header>
                <Card.Body>
                  <Form.Select
                    value={address.country}
                    onChange={handleAddressChange}
                    name="country"
                    aria-label="Default select example mt-1"
                  >
                    <option>Country</option>
                    {countriesList.map((country, index) => {
                      return (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <br />
                  <Form.Select
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    aria-label="Default select example mt-1"
                  >
                    <option>Open this select menu</option>
                    {stateList.map((state, index) => {
                      return (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </Form.Select>{" "}
                  <br />
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="city"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="city"
                      onChange={handleAddressChange}
                      value={address.city}
                    />
                  </InputGroup>
                  <Button type="submit" variant="success">
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>

          <Col>
            <Form onSubmit={updatePassword}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Password</Card.Header>
                <Card.Body>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="old pasword"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="password"
                      value={userPassword.password}
                      onChange={handleUserPasswordChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="new password"
                      aria-label="Username"
                      name="new_password"
                      aria-describedby="basic-addon1"
                      onChange={handleUserPasswordChange}
                      value={userPassword.new_password}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="confirm password"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="confirm_password"
                      onChange={handleUserPasswordChange}
                      value={userPassword.confirm_password}
                    />
                  </InputGroup>
                  <Button type="submit" variant="success">
                    Update
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
        <Button
          type="submit"
          onClick={handleShow}
          className="m-auto"
          style={{ width: "200px" }}
          variant="danger"
        >
          Delete My Account
        </Button>
        <DeleteModal
          handleClose={handleClose}
          deleteAccount={deleteAccount}
          show={show}
        />
      </Container>
    </Fragment>
  );
}

export default Profile;
