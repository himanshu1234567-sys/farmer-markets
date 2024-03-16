import React, { useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import LocationInfo from "./components/LocationInfo";
import ContactInfo from "./components/ContactInfo";
import Alert from "react-bootstrap/Alert";
import { saveActivity } from "../../services/usersService";
import { Link } from "react-router-dom";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    confirm_password: "",
    email: "",
    phone_number: "",
    country: "",
    city: "",
    state: "",
    address: "",
    type:"",
    userCart:{products:[]}
  });

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => {
  
    if (step < 2) {
      if (values.name==="" || values.password==="" || values.confirm_password==="") {
        setError("Please fill in all fields.");
        return false;
      }
      if (values?.password !== values?.confirm_password) {
        setError("Passwords do not match.");
        return false;
      }
      setError("");
      setStep(step + 1);
    }
    // 
    
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const submit = () => {
    console.log(values);

    if (values.email==="" || values.phone_number==="" ) {
     
      setError("Please fill in all fields.");
      return false;
    }
    
    setError("");

    var users = JSON.parse(localStorage.getItem("Users")) || [];
    var userData = values;
    users.push(userData);
    localStorage.setItem("Users", JSON.stringify(users));
    saveActivity("User registered");

    setStep(1);

    setValues({
      name: "",
      password: "",
      confirm_password: "",
      email: "",
      phone_number: "",
      country: "",
      city: "",
      state: "",
      address: "",
    });
    setShowSuccess(!showSuccess);
  };
  return (
    <div className="bg-dark vh-100">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-3 w-50 mt-5">
          {showSuccess ? (
            <Alert variant="success">
              <Alert.Heading>You have successfully registered</Alert.Heading>
              Click Here for Login
              <Link  className="m-4" to='/login'>Login</Link>
            </Alert>
          ) : (
            ""
          )}
          {/* {
            {
              1: <PersonalInfo handleChange={handleChange} />,
              2: <ContactInfo handleChange={handleChange} />,
              3: <LocationInfo values={values} handleChange={handleChange} />,
            }[step]
          } */}
          

        
          {step === 1 &&  <PersonalInfo handleChange={handleChange} />}
          {step === 2 &&  <ContactInfo handleChange={handleChange} />}
          {
            error? <text  className="text-danger text-center mt-5">{error}</text> : ''
          }
          {/* {step === 3 &&  <LocationInfo values={values} handleChange={handleChange} />} */}
          <div className="d-flex justify-content-around px-5 mt-5">
            {step > 1 ? (
              <button className="btn btn-warning" onClick={prevStep}>
                Back
              </button>
            ) : null}
            <button
              className="btn btn-warning"
              onClick={step === 2 ? submit : nextStep}
            >
              {step === 2 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
