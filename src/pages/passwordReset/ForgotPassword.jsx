import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ForgotPassword() {

  const [values ,setValues] = useState({email:'' , password:''})
  const [newDetails,setNewDetails] = useState();
  const handleChange =(event)=>{
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  const formSubmit = (e)=>{
    e.preventDefault();
      //  console.log(values);
       const users = JSON.parse(localStorage.getItem("Users")) || [];
       const index = users.findIndex(function (entry) {
        return entry.email === values.email;
        });

        if(index !== -1){
          console.log(users[index])
           users[index]= {...users[index], password: values.password}
           localStorage.setItem("Users", JSON.stringify(users));
        }
        // console.log(newDetails);
  }
  return (
    <Fragment>
      <Form style={{ width: "35%", margin: "auto", marginTop: "7%" }} onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your Email address</Form.Label>
          <Form.Control name="email" onChange={handleChange} value={values.email } type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  );
}

export default ForgotPassword;
