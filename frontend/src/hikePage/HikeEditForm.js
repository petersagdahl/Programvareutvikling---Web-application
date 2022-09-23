/**
    @author Peter Sagdahl
    @author Karoline Stabell

    @description
    Purpose: Form for editing hikes.

    Usage:
    <HikeEditForm 
        submitCallback={funksjon som har en parameter} -> returnerer objekt under
        initialValues={objekt som inneholder verdiene under}
    />

    Eksempel på funksjon:
    const submitCallback = (values) => {
        console.log(values);
    }

    Eksempel på objekt:
    {
        title: "",
        startDate: "",
        endDate: "",
        length: 0,
        difficulty: Middels,
        startPosition: "",
        endPosition: "",
        equptment: ""
    }
*/

import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import Hike from "../model/hike.js";
//import { createNewHike, updateHike, auth } from "../firebase-config.js";
import { useLocation, useNavigate, useParams } from "react-router";
import { currentHike, getCurrentHike } from "../globState/current_hike.js";
import DatabaseApi from "../api/DatabaseAPI.js";
import { CommercialContext, UserContext } from "../App.js";

const HikeEditForm = (hike) => {
  const commercialContext = useContext(CommercialContext);
  const userIsCommercial = commercialContext;
  const currentUserId = useContext(UserContext);

  // Creating object with initial values
  const location = useLocation();

  console.log(hike);

  const hikeObject = getCurrentHike();
  /*
  let initialValues = {
    title: location.state.title,
    startDate: location.state.startDate,
    startTime: location.state.startTime,
    endDate: location.state.endDate,
    endTime: location.state.endTime,
    length: location.state.length,
    difficulty: location.state.difficulty,
    startPosition: location.state.startPosition,
    endPosition: location.state.endPosition,
    equipment: location.state.equipment,
    price: location.state.price,
  };
*/
  const errors = {
    title: "",
    startDate: "", //Date(),
    endDate: "", //Date(),
    // startTime: "",
    // endTime:"",
    length: "",
    difficulty: "",
    startPosition: "",
    endPosition: "",
    equipment: "",
  };

  const [formValues, setFormValues] = useState({
    title: hikeObject.title,
    startDate: hikeObject.startDate,
    startTime: hikeObject.startTime,
    endDate: hikeObject.endDate,
    endTime: hikeObject.endTime,
    length: hikeObject.length,
    difficulty: hikeObject.difficulty,
    startPosition: hikeObject.startPosition,
    endPosition: hikeObject.endPosition,
    equipment: hikeObject.equipment,
    price: hikeObject.price,
  });

  const [formErrors, setFormErrors] = useState(errors);
  const [isSubmit, setIsSubmit] = useState(false);

  /*
    // Help function for removing alphabetical characters
    const forceNumber = (str) => {
        return str.replace(/\D/g, '');
    }
    */

  /**
   * Fires when input field is changed
   * @param {*} event
   */

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value }); // Adds the new input to the value form
  };

  const handleRadio = (event) => {
    // const {name, value} = event.target.checked.value
    // setFormValues({...formValues, [name]: value})
    formValues.difficulty = `${event.target.value}`;
  };

  // Validation of form
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues)); // sets errors from the form validation
    setIsSubmit(true);

    // TODO: Validation needs to be done
    // Passe på at alle felter har lovlig verdi
    //Lage HIKE OBJEKT
  };

  useEffect(() => {
    if (isSubmit) {
      if (Object.keys(formErrors).length === 0) {
        //writing to firebase if no errors
        console.log(formValues);
        const hike = new Hike();

        hike.id = currentHike.id;
        hike.title = formValues.title;
        hike.startDate = formValues.startDate;
        hike.startTime = formValues.startTime;
        hike.endDate = formValues.endDate;
        hike.endTime = formValues.endTime;
        hike.length = formValues.length;
        hike.difficulty = formValues.difficulty;
        hike.startPosition = formValues.startPosition;
        hike.endPosition = formValues.endPosition;
        hike.equipment = formValues.equipment;
        hike.price = formValues.price;
        hike.organizer = currentUserId;
        hike.participants = getCurrentHike().participants;

        //updateHike(hike);
        DatabaseApi.updateHike(hike);
      }
      setIsSubmit(false);
    }
  }, [currentUserId, formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const hike = new Hike();

    try {
      if (!values.title) throw new Error("Skriv inn tittel");
      hike.title = values.title;
    } catch (error) {
      errors.title = error.message;
    }

    try {
      if (!values.startDate) throw new Error("Skriv inn startdato");
      if (!values.startTime) throw new Error("Skriv inn starttidspunkt");
      let startTimeList = values.startTime.split(":");
      let startDateList = values.startDate.split("-");

      let start = new Date(
        parseInt(startDateList[0]),
        parseInt(startDateList[1]),
        parseInt(startDateList[2]),
        parseInt(startTimeList[0]),
        parseInt(startTimeList[1])
      );
      if (start.getTime() - Date.now() < 0) {
        throw new Error("Datoen må være i fremtiden");
      }

      hike.startDate = values.startDate;
      hike.startTime = values.startTime;
    } catch (error) {
      errors.startDate = error.message;
      errors.startTime = error.message;
    }

    try {
      if (!values.endDate) throw new Error("Skriv inn sluttdato");
      if (!values.endTime) throw new Error("Skriv inn sluttidspunkt");

      let startTimeList = values.startTime.split(":");
      let startDateList = values.startDate.split("-");

      let endTimeList = values.endTime.split(":");
      let endDateList = values.endDate.split("-");

      let start = new Date(
        parseInt(startDateList[0]),
        parseInt(startDateList[1]),
        parseInt(startDateList[2]),
        parseInt(startTimeList[0]),
        parseInt(startTimeList[1])
      );
      let end = new Date(
        parseInt(endDateList[0]),
        parseInt(endDateList[1]),
        parseInt(endDateList[2]),
        parseInt(endTimeList[0]),
        parseInt(endTimeList[1])
      );

      if (
        end.getTime() - Date.now() < 0 ||
        end.getTime() - start.getTime() < 0
      ) {
        throw new Error("Sluttidspunkt må være etter starttidspunkt");
      }
      hike.endDate = values.endDate;
      hike.endTime = values.endTime;
    } catch (error) {
      errors.endDate = error.message;
      errors.endTime = error.message;
    }

    try {
      if (!values.difficulty) throw new Error("Man må velge vanskelighetsgrad");
    } catch (error) {
      errors.difficulty = error.message;
    }

    try {
      if (!values.length) throw new Error("Skriv inn lengden");
      hike.length = values.length;
    } catch (error) {
      errors.length = error.message;
    }

    try {
      if (!values.startPosition) throw new Error("Skriv inn startposisjon");
      hike.startPosition = values.startPosition;
    } catch (error) {
      errors.startPosition = error.message;
    }

    try {
      if (!values.endPosition) throw new Error("Skriv inn sluttposisjon");
      hike.endPosition = values.endPosition;
    } catch (error) {
      errors.endPosition = error.message;
    }

    try {
      if (!values.equipment) throw new Error("Skriv inn utstyr");
      hike.equipment = values.equipment;
    } catch (error) {
      errors.equipment = error.message;
    }

    return errors;
  };

  //type="datetime-local" timeFormat="YYYY-MM-DD HH:mm" defaultValue={d}

  return (
    <Container className="hikeInputForm">
      <Form onSubmit={handleSubmit} validated={false}>
        {/* Hike title */}
        <Form.Group className="mb-3">
          <FloatingLabel label="Tittel: En tur til Jonsvatnet">
            <Form.Control
              placeholder=""
              name={"title"}
              value={formValues.title}
              onChange={handleChange}
            />
          </FloatingLabel>
          <p className="form-error-message" style={{ color: "red" }}>
            {formErrors.title}
          </p>
        </Form.Group>

        {/* Hike Start Date */}
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="hikeStartDate">
              <FloatingLabel label="Start dato">
                <Form.Control
                  name={"startDate"}
                  value={formValues.startDate}
                  type="date"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="hikeStartDate">
              <FloatingLabel label="Start tid">
                <Form.Control
                  name={"startTime"}
                  value={formValues.startTime}
                  type="time"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <p className="form-error-message" style={{ color: "red" }}>
            {formErrors.startTime}{" "}
          </p>
        </Row>

        {/* Hike End Date */}
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="hikeEndDate">
              <FloatingLabel label="Slutt dato">
                <Form.Control
                  name={"endDate"}
                  value={formValues.endDate}
                  type="date"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="hikeEndDate">
              <FloatingLabel label="Slutt tid">
                <Form.Control
                  name={"endTime"}
                  value={formValues.endTime}
                  type="time"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <p className="form-error-message" style={{ color: "red" }}>
          {formErrors.endTime}{" "}
        </p>

        {/* Hike length */}
        <Form.Group className="mb-3" controlId="hikeLength">
          <FloatingLabel label="Lengde (kilometer)">
            <Form.Control
              placeholder=""
              name={"length"}
              value={formValues.length}
              onChange={handleChange}
            />
            <p className="form-error-message" style={{ color: "red" }}>
              {formErrors.length}{" "}
            </p>
          </FloatingLabel>
        </Form.Group>

        {/* Hike position */}
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="hikeStartPos">
              <FloatingLabel label="Startposisjon: Gatenavn, Postnummer Sted">
                <Form.Control
                  placeholder=""
                  name={"startPosition"}
                  value={formValues.startPosition}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <p className="form-error-message" style={{ color: "red" }}>
                {formErrors.startPosition}{" "}
              </p>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="hikeEndPos">
              <FloatingLabel label="Sluttposisjon: Gatenavn, Postnummer Sted">
                <Form.Control
                  placeholder=""
                  name={"endPosition"}
                  value={formValues.endPosition}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <p className="form-error-message" style={{ color: "red" }}>
                {formErrors.endPosition}{" "}
              </p>
            </Form.Group>
          </Col>
        </Row>

        {/* Hike difficulty */}
        <Form.Group
          className="mb-3"
          controlId="hikeDifficulty"
          style={{ color: "beige" }}
        >
          <Form.Label>Vanskelighetsgrad: </Form.Label>
          <div key={`inline-radio`} className="mb-3">
            <Form.Check
              inline
              label="Lett"
              name="difficulty"
              type="radio"
              id="Lett"
              value="Lett"
              onChange={handleRadio}
            />
            <Form.Check
              inline
              label="Middels"
              name="difficulty"
              type="radio"
              id="Middels"
              value="Middels"
              onChange={handleRadio}
            />
            <Form.Check
              inline
              label="Vanskelig"
              name="difficulty"
              type="radio"
              id="Vanskelig"
              value="Vanskelig"
              onChange={handleRadio}
            />
          </div>
        </Form.Group>

        {/* Hike Price */}
        
        { userIsCommercial ? ( 
        <Form.Group className="mb-3" controlId="hikePrice">
          <FloatingLabel label="Price">
            <Form.Control
              value={formValues.price}
              as="textarea"
              name={"price"}
              onChange={handleChange}
            />
          </FloatingLabel>
          <p className="form-error-message" style={{ color: "red" }}>
            {formErrors.equipment}{" "}
          </p>
        </Form.Group>) : null } 

        {/* Hike Equipment */}
        <Form.Group className="mb-3" controlId="hikeEquiptment">
          <FloatingLabel label="Utstyr">
            <Form.Control
              value={formValues.equipment}
              as="textarea"
              name={"equipment"}
              onChange={handleChange}
            />
          </FloatingLabel>
          <p className="form-error-message" style={{ color: "red" }}>
            {formErrors.equipment}{" "}
          </p>
        </Form.Group>
        <Button type="submit">Rediger</Button>

        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div>
            <p>Turen er registrert</p>
          </div>
        ) : null}
      </Form>
    </Container>
  );
};

export default HikeEditForm;
