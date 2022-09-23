/*
    Author: Peter Sagdahl
    Purpose: show a user to the user

    Usage:
    <UserPage userObject={user class}/>
*/

import React, { useContext, useEffect, useState } from "react";
// @ts-ignore
import User from "../model/user";
// @ts-ignore
import { Container, Row, Button, Stack, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import DatabaseApi from "../api/DatabaseAPI";
//import { auth, fetchUser } from "../firebase-config";

/// UserPage
const UserPage = (props) => {
  const appContext = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    if (!appContext) {
      nav("/", { replace: true });
    }
  }, [appContext, nav]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    DatabaseApi.fetchCurrentUser().then((user) => {
      setUser(user);
    });
    // fetchUser.then(user => {
    //   setUser(user);
    // });
  }, []);

  const roller = ["Bruker"];
  if (user && user.isCommercial)
  {
    roller.push(", Kommersiell aktør");
  }
  if (user && user.isAdmin)
  {
    roller.push(", Adminbruker");
  }

  return (
    <Container
      style={{
        background:
          "radial-gradient(circle, rgba(0,0,0,0.8561799719887955) 0%, rgba(0,0,0,0.4332107843137255) 10%, rgba(48,48,48,0) 50%)",
      }}
    >
      {user ? (
        <Col
          // @ts-ignore
          align="center"
        >
          <Row>
            <Col sm></Col>

            <Col
              // @ts-ignore
              align="center"
              sm
            >
              <p className="mt-5"></p>
              <img
                id="userPic"
                className="mt-3"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/500px-Felis_catus-cat_on_snow.jpg"
                style={{
                  border: "white solid 2px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: 200,
                  height: 200,
                }}
              />

              <h1 className="mt-5">
                {" "}
                {user.firstName} {user.surname}
              </h1>

              <Col
                // @ts-ignore
                align="center"
                className="userText"
                width="400"
              >
                <p></p>
                <p>
                  {" "}
                  <strong>Rolle:</strong> {roller}
                </p>
                <p>
                  {" "}
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  {" "}
                  <strong>Telefon:</strong> {user.phone}{" "}
                </p>
                <p>
                  {" "}
                  <strong>Fødselsdato:</strong> {user.dateOfBirth}
                </p>
                <Col>
                  <Stack direction="horizontal" className="mt-5 ">
                    <p>
                      {user.id === 1 && (
                        <Button className="btn btn-default" variant="primary">
                          Redigere
                        </Button>
                      )}
                      {"  "}
                      {/*user.admin && (
                      <Button className="btn btn-primary" variant="secondary">
                        Sletteknapp
                      </Button>
                    )*/}
                    </p>
                  </Stack>
                </Col>
              </Col>
            </Col>
            <Col sm></Col>
          </Row>
        </Col>
      ) : null}
    </Container>
  );
};

export default UserPage;
