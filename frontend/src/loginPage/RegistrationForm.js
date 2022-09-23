/**
 * @author Jathavaan Shankarr
 * @purpose Allows a user to register for an account
 * source for validation: https://www.youtube.com/watch?v=EYpdEYK25Dc&ab_channel=DipeshMalvia
 */

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
// import { auth, registerWithEmailAndPassword } from "../firebase-config";

import User from "../model/user";
import React from "react";
import DatabaseApi from "../api/DatabaseAPI";

const RegistrationForm = () => {
  const initialValues = {
    firstName: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
  };

  const errors = {
    firstName: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(errors);
  const [isUnusedEmail, setIsUsedEmail] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  /**
   * Fires when input field is changed
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // Adds the change of input field to formValues
  };

  /**
   * Handles the data inputed into the register form.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues)); // Sets errors from the form validation
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // DATA SHOULD BE ADDED TO THE DATABASE HERE!!
      console.log(formValues);
      register();
    }
  }, [formErrors]);

  //Sends the data for authentication, may need further work.
  const register = async () => {
    if (Object.keys(formErrors).length === 0) {
      try {
        const user = new User(
          formValues.email,
          formValues.firstName,
          formValues.surname,
          formValues.phone,
          formValues.dateOfBirth,
          false,
          false
        );

        DatabaseApi.registerWithEmailAndPassword(formValues.email, formValues.password, user).then(newUser => {
          setIsUsedEmail(true);
        })

        // const newuser = registerWithEmailAndPassword(
        //   formValues.email,
        //   formValues.password,
        //   user
        // );
        // console.log(newuser);
        // setIsUsedEmail(true);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  /**
   * Validates values sent by the registration form
   * Should use User class from model/user.js and handle the exceptions thrown there
   * @param {*} values
   */
  const validate = (values) => {
    const errors = {};
    const user = new User();

    try {
      user.firstName = values.firstName;
    } catch (error) {
      errors.firstName = error.message;
    }

    try {
      user.surname = values.surname;
    } catch (error) {
      errors.surname = error.message;
    }

    try {
      user.dateOfBirth = values.dateOfBirth;
    } catch (error) {
      errors.dateOfBirth = error.message;
    }

    try {
      user.phone = values.phone;
    } catch (error) {
      errors.phone = error.message;
    }

    try {
      user.email = values.email;
    } catch (error) {
      errors.email = error.message;
    }

    /**
     * Password must fulfill the following requirements:
     * at least one uppercase letter
     * at least one lowercase letter
     * at least one number
     * min length: 6 characters
     * max length: 20 characters
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

    return errors;
  };

  return (
    <Container className="form-div" style={{ color: "black" }}>
      <Form className="user-form" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="py-3">
              <FloatingLabel label="Fornavn">
                <Form.Control
                  type="text"
                  className="user-form-input"
                  name="firstName"
                  placeholder=""
                  value={formValues.firstName}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <p className="form-error-message">{formErrors.firstName}</p>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="py-3">
              <FloatingLabel label="Etternavn">
                <Form.Control
                  type="text"
                  className="user-form-input"
                  name="surname"
                  placeholder=""
                  value={formValues.surname}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <p className="form-error-message">{formErrors.surname}</p>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="py-3">
          <FloatingLabel label="Fødselsdato">
            <Form.Control
              type="date"
              className="user-form-input"
              name="dateOfBirth"
              value={formValues.dateOfBirth}
              onChange={handleChange}
            />
          </FloatingLabel>
          <p className="form-error-message">{formErrors.dateOfBirth}</p>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="py-3">
              <FloatingLabel label="E-post">
                <Form.Control
                  type="email"
                  className="user-form-input"
                  name="email"
                  placeholder=""
                  value={formValues.email}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <p className="form-error-message">{formErrors.email}</p>
              <p className="form-error-message">{}</p>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="py-3">
              <FloatingLabel label="Telefon">
                <Form.Control
                  type="tel"
                  className="user-form-input"
                  name="phone"
                  placeholder=""
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <p className="form-error-message">{formErrors.phone}</p>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="py-3">
          <FloatingLabel label="Passord">
            <Form.Control
              type="password"
              className="user-form-input"
              name="password"
              placeholder=""
              value={formValues.password}
              onChange={handleChange}
            />
          </FloatingLabel>
          <p className="form-error-message">{formErrors.password}</p>
        </Form.Group>

        {Object.keys(formErrors).length === 0 && isSubmit && !isUnusedEmail ? (
          <div>
            <p className="form-error-message">Epost er allerede i bruk</p>
          </div>
        ) : null}

        <Form.Group className="d-grid gap-2 py-3">
          <Button
            type="submit"
            variant="success"
            size="lg"
            className="user-form-submit"
            onClick={handleSubmit}
          >
            Registrer
          </Button>
          <p className="form-error-message">{formErrors.registerError}</p>
        </Form.Group>

        {Object.keys(formErrors).length === 0 && isSubmit && isUnusedEmail ? (
          <div style={{ color: "green" }}>
            <p>Bruker registrert</p>
          </div>
        ) : null}
      </Form>
    </Container>
  );
};

export default RegistrationForm;
