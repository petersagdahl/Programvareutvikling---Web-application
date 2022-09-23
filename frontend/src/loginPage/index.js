/**
 * @author Jathavaan Shankarr
 * @purpose Allows user to either log in or register
 */

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import RegistrationFormCom from "./RegistrationFormCom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import React from "react";
import "../index.css";

const LoginUI = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [currentPage, setCurrentPage] = useState("login");

  const changeMode = (show) => {
    if (show === "login") {
      setCurrentPage("login");
    } if (show === "reg") {
      setCurrentPage("reg");
    } if (show === "regCom") {
      setCurrentPage("regCom");
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Container className="p-3">
      <Container>
        <div className="login-mode gap-2">
          <img
            className="logoImage"
            src={require(// @ts-ignore
            "../assets/logov1.png")}
            alt="Logo"
          />
        </div>
      </Container>
      <Container className="d-grid gap-2">
        {
          // Changes color of mode button based on what button page user is on
          currentPage === "login" ? (
            <div className="login-mode gap-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => changeMode("login")}
              >
                Logg inn
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => changeMode("reg")}
              >
                Registrer deg
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => changeMode("regCom")}
              >
                Registrer kommersiell aktør
              </Button>
            </div>
          ) : null } { currentPage === "reg" ? (
            <div className="login-mode gap-2">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => changeMode("login")}
              >
                Logg inn
              </Button>
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => changeMode("reg")}
              >
                Registrer deg
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => changeMode("regCom")}
              >
                Registrer kommersiell aktør
              </Button>
            </div>
          ) : null } { currentPage === "regCom" ? (
          <div className="login-mode gap-2">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => changeMode("login")}
            >
              Logg inn
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => changeMode("reg")}
            >
              Registrer deg
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => changeMode("regCom")}
            >
              Registrer kommersiell aktør
            </Button>
          </div>
        ) : null
      }
      </Container>
      {currentPage === "login" && <LoginForm />}
      {currentPage === "reg" && <RegistrationForm />}
      {currentPage === "regCom" && <RegistrationFormCom />}

      
    </Container>
    </div>
  );
};

export default LoginUI;
