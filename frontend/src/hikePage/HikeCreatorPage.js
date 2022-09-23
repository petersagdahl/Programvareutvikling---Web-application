/*
    Author: Johan Solbakken
    Purpose: Creates hikes from user input.

    Usage:
    <HikeCreatorPage />


*/

import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import HikeInputForm from "./HikeInputForm";

// TODO: Fikse....

const HikeCreatorPage = (props) => {
    const userContext = useContext(UserContext);
    const nav = useNavigate();
    useEffect(() => {
      if (!userContext) {
        nav("/", { replace: true });
      }
    }, [userContext, nav]);

  const submitCallback = (values) => {
    console.log(values);
    // TODO: Validere verdiene som kommer og sende de til serveren.
    // Hvis vi klarte å oppdatere/opprette verdiene i firebase, kan vi gå tilbake til forrige side.
    // Ellers, vis feilmelding.
    // Denne funksjonen burde produsere et Hike objekt? men hadde ikke tilgang til Hike objektet...
  };

  return (
    <Container>
      <h1>Lag en ny tur</h1>
      <HikeInputForm
        submitCallback={submitCallback}
        initialValues={{
          title: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          length: 0,
          duration: 0,
          difficulty: "Midd",
          startPosition: "",
          endPosition: "",
          equptment: "",
          price: 0,
        }}
      />
    </Container>
  );
};

export default HikeCreatorPage;
