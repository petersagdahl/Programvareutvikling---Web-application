/**
 * @author Jathavaan Shankarr
 * @purpose Allows user to login to the application
 */

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import React from "react";
import DatabaseApi from "../api/DatabaseAPI";
import { isSafari } from "@firebase/util";
//import { logInWithEmailAndPassword } from '../firebase-config'

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const errors = {
    email: "",
    password: "",
  };

  const [formValues, setFormvalues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(errors);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  /**
   * Fires when input field is changed
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
  };

  const validInput = () => {
    return Object.keys(formErrors).length === 0;
  };

  /**
   * Handles the data inputed into the login form
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues)); // Sets errors from the form validation
    setIsSubmit(true);
    setIsFirst(false);
  };

  useEffect(() => {
    if (isSubmit)
    {
    if (validInput()) {
      console.log("Form values er", formValues)
      const email = formValues.email;
      const password = formValues.password;
      DatabaseApi.logInWithEmailAndPassword(email, password).catch(error => { console.log("no")});
      //logInWithEmailAndPassword(email, password);
    }
    setIsSubmit(false);
  }
  }, [formErrors, formValues, formValues.email, formValues.password, isSubmit, validInput]);

  /**
   * Validates values given
   * @param {*} values
   */
  const validate = (values) => {
    const errors = {};

    /**
     * Email validation
     * - Cannot be empty
     * - Must be on correct email form
     */
    try {
      const re = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ); // Source: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
      if (!values.email) throw new Error("Skriv inn en e-post for å fortsette");
      if (!re.test(values.email)) throw new Error("E-post er på feil form");
    } catch (error) {
      errors.email = error.message;
    }

    /**
     * Password Validation
     * - Cannot be empty
     * - Cannot be shorter than 6 letter
     * - Cannot be longer than 20 letters
     * - Must contain at least one lowercase and uppercase letter and one number
     */
    try {
      const re = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/
      );

      if (!values.password)
        throw new Error("Skriv inn et passord for å fortsette");
      if (values.password.length < 6)
        throw new Error("Passordet må være minst 6 tegn langt");
      if (values.password.length > 20)
        throw new Error("Passordet kan ikke være lenger enn 20 tegn langt");
      if (!re.test(values.password))
        throw new Error(
          "Passordet må inneholde minst en stor og liten bokstav, og minst ett tall"
        );
    } catch (error) {
      errors.password = error.message;
    }

    // Add email and password check towards db

    return errors;
  };

  return (
    <Container className="form-div">
      {/* Form */}
      <Form className="user-form" onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group className="py-3" style={{ color: "black" }}>
          <FloatingLabel label="E-post">
            <Form.Control
              type="email"
              className="user-form-input"
              name="email"
              placeholder=""
              value={formValues.email}
              onChange={handleChange}
              id="emailField"
            />
          </FloatingLabel>
          <p className="form-error-message">{formErrors.email}</p>
        </Form.Group>

        {/* Password */}
        <Form.Group className="py-3" style={{ color: "black" }}>
          <FloatingLabel label="Passord">
            <Form.Control
              type="password"
              className="user-form-input"
              name="password"
              placeholder=""
              value={formValues.password}
              onChange={handleChange}
              id="passwordField"
            />
          </FloatingLabel>
          <p className="form-error-message">{formErrors.password}</p>
        </Form.Group>

        {/* Button */}
        <Form.Group className="d-grid gap-2 py-3">
          <Button
            variant="success"
            size="lg"
            type="submit"
            className="user-form-submit"
          >
            Logg inn
          </Button>
          {Object.keys(formErrors).length !== 0 && !isFirst ? (
            <div>
              <p className="form-error-message">Feil e-post og passord</p>
            </div>
          ) : null}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LoginForm;
