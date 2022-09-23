/**
    @author Peter Sagdahl
    @author Karoline Stabell

    @description
    Purpose: Edits hike from user input.

    Usage:
    <HikeEditPage />
*/

import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { UserContext } from "../App";
import { currentHike, getCurrentHike } from "../globState/current_hike";
import Hike from "../model/hike";
import HikeEditForm from "./HikeEditForm";




/*
let hike = this.props.location.myCustomprop;
*/
   
const HikeEditPage = (state) => {
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
    // Denne funksjonen burdehik produsere et Hike objekt? men hadde ikke tilgang til Hike objektet...
  }

  const location = useLocation()

  const [hikeState, setHikeState] = React.useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    length: '',
    difficulty: '',
    startPosition: '',
    endPosition: '',
    equipment: '',
    price: 0,

  })

  React.useEffect(() => {
    //setHikeState(location.state)
    if (currentHike)
    {
      const hike = getCurrentHike();
      setHikeState({
        title: hike.title,
        startDate: hike.startDate,
        startTime: hike.startTime,
        endDate: hike.endDate,
        endTime: hike.endTime,
        length: String(hike.length),
        difficulty: hike.difficulty,
        startPosition: hike.startPosition,
        endPosition: hike.endPosition,
        equipment: hike.equipment,
        price: hike.price,
      });
    }
    //console.log(location)
  }, [])
    console.log(hikeState.title)
    console.log(hikeState.price)

  

  return (
    
    <Container>
      <h1>Rediger tur</h1>
      <HikeEditForm
        submitCallback={submitCallback}
        initialvalues = {{
          title: hikeState.title,
          startDate: hikeState.startDate,
          startTime: hikeState.startTime,
          endDate: hikeState.endDate,
          endTime: hikeState.endTime,
          length: hikeState.length,
          difficulty: hikeState.difficulty,
          startPosition: hikeState.startPosition,
          endPosition: hikeState.endPosition,
          equipment: hikeState.equipment,
          price: hikeState.price,
        }}
      />

    </Container>
  );
};

export default HikeEditPage;
