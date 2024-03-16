import React, { useState } from "react";
import { Form } from "react-bootstrap";
import stateCountry from 'state-country';


const LocationInfo = ({ handleChange ,values}) => {
  const countriesList = stateCountry.getAllCountries();
  const stateList = stateCountry.getAllStatesInCountry(values.country);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Location Info</h2>
      <Form.Group className="w-75 mt-4">
        <Form.Select aria-label="Default select example" name="country"  onChange={handleChange("country")}>
            <option>Select Country</option>
             {
              countriesList.map((country)=>{
                return(
                 <option key={country.id} value={country.name}>{country.name}</option>
                )
              })
             }
        </Form.Select>
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <Form.Select aria-label="Default select example" name="state"  onChange={handleChange("state")}>
            <option>Select State</option>
            {
              (stateList.length!=0) ?  
              stateList.map((state)=>{
                return(
                 <option key={state.id} value={state.name}>{state.name}</option>
                )
              })
              : ''
             }
        </Form.Select>
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="City"
          onChange={handleChange("city")}
          name="city"
        />
      </Form.Group>
    </div>
  );
};

export default LocationInfo;
