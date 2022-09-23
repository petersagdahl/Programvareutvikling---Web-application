/** 
    @author Johan Solbakken <johsol@stud.ntnu.no>
    @author Tim
    @author Karoline

    @description
    Viser frem en Hike klasse.

    Usage:
    <HikeView hikeObject={fra hike klasse} />
*/

// import {
//   addParticipant,
//   auth,
//   delDoc,
//   deleteHikeFromDB,
//   fetchUserByUId,
//   fetchUsersByUId,
//   removeParticipant,
// } from "../firebase-config";
import { Link } from "react-router-dom";  
import DatabaseApi from "../api/DatabaseAPI";
import { CommercialContext, UserContext } from "../App";
import { setCurrentHike } from "../globState/current_hike";

const { default: React, useEffect, useState, useContext } = require("react");
const { Container, Row, Col, Card, Button } = require("react-bootstrap");

const HikeView = (props) => {
  const userContext = useContext(UserContext);
  const commercialContext = useContext(CommercialContext);

  // Current user information
  const currentUserId = userContext;

  // Information about the hike
  const hikeObject = props.data;
  const hikeId = hikeObject.id;
  const organizerId = hikeObject.organizer;
  const participantsIdList = hikeObject.participants;

  // Information about the organizer
  const [organizer, setOrganizer] = useState({
    id: "",
    firstname: "",
    surname: "",
    isCommercial: false,
  });

  // A list of <p> elements containing participant names
  const [participantNameList, setParticipantNameList] = useState([]);

  const [reloadHikeView, setReloadHikeView] = useState(true);

  /**
   * Updates the database, adds user id to hike
   * @param {string} uid The id of the user
   * @param {string} hikeId The id of the hike
   */
  const addParticipantToHike = (uid, hikeId) => {
    console.log(uid);
    DatabaseApi.addParticipantToHike(hikeId, uid)
      .then((message) => {
        props.reloadPageFunc();
        setReloadHikeView(true);
      })
      .catch((error) => console.log(error));
  };

  /**
   * Updates the database. Removes a user id from the hike.
   * @param {string} uid The id of the user
   * @param {string} hikeId The id of the hike
   */
  const removeParticipantFromHike = (uid, hikeId) => {
    DatabaseApi.removeParticipantFromHike(hikeId, uid)
      .then((melding) => {
        props.reloadPageFunc();
        setReloadHikeView(true);
      })
      .catch((error) => console.log(error));
  };

  const deleteHikeById = (hikeId) => {
    DatabaseApi.deleteHike(hikeId);
    //deleteHikeFromDB(hikeId);
  };

  useEffect(() => {
    if (reloadHikeView) {
      // setting the organizer
      DatabaseApi.fetchUserById(organizerId)
        .then((user) => {
          setOrganizer({
            id: user.id,
            firstname: user.firstName,
            surname: user.surname,
            isCommercial: user.isCommercial
          });
        })
        .catch((error) => {});

      // setting participants
      DatabaseApi.fetchUsersByIds(participantsIdList).then((users) => {
        const tempListOfParticipantNames = [];
        users.forEach((participant) => {
          tempListOfParticipantNames.push(
            participant.isCommercial ?
            <p>{participant.firstName}</p>
            :
            <p>{participant.firstName + " " + participant.surname}</p>
          );
        });
        setParticipantNameList(tempListOfParticipantNames);
      });
      setReloadHikeView(false);
    }
  }, [organizerId, participantsIdList, reloadHikeView]);

  return (
    <Card className="m-5" style={{ width: "50%" }}>
      {/* Bytte ut bildet med Hike image */}
      <img
        className="card-image-top"
        src="http://res.cloudinary.com/simpleview/image/upload/v1515576207/clients/norway/3e0981da_3280_49d6_b879_353fe2d8c8f9_d707ed6d-2954-49db-9755-f0fbd5e08144.jpg"
        style={{
          height: 400,
          objectFit: "cover",
        }}
        alt="et bilde"
      />
      <Container className="card-body">
        <Row>
          <h1 className="card-title">{hikeObject.title}</h1>
        </Row>

        <Row>
          <Col>
            <p className="card-text">
              Startdato: <i>{hikeObject.startDate}</i>
            </p>
            <p className="card-text">
              Oppmøtested: <i>{hikeObject.startPosition}</i>
            </p>
          </Col>
          <Col>
            <p className="card-text">
              Sluttdato: <i>{hikeObject.endDate}</i>
            </p>
            <p className="card-text">
              Avslutningssted: <i>{hikeObject.endPosition}</i>
            </p>
          </Col>
        </Row>

        <Row>
          <p className="card-text">Lengde: {hikeObject.length}km</p>
        </Row>

        <Row>
          <h2 className="card-title">Utstyr</h2>
          <p className="card-text">{hikeObject.equipment}</p>
        </Row>
        {
          organizer.isCommercial ? <Row>
          <h2 className="card-title">Pris</h2>
          <p className="card-text">
            {hikeObject.price}kr
          </p>
        </Row>: null
        }
        <Row>
          <h2 className="card-title">Arrangør</h2>
          <p className="card-text">
            {organizer.isCommercial ? organizer.firstname : organizer.firstname + " " + organizer.surname}
          </p>
        </Row>
        <Row>
          <h3 className="card-title">Påmeldte</h3>
          {participantNameList}
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div style={{ textAlign: "right" }}>
              {currentUserId === hikeObject.organizer ? (
                <Col>
                  <Link
                    to={"/hike/edit"}
                    state={{
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
                      id: hikeObject.id,
                    }}
                  >
                    <Button
                      style={{ width: 100 }}
                      onClick={() => {
                        console.log("Nå skal vi redigere", hikeObject);
                        setCurrentHike(hikeObject);
                      }}
                    >
                      Rediger
                    </Button>
                  </Link>
                  <p></p>
                  <Button
                    onClick={() => {
                      // delDoc("hikes", hikeObject.id)
                      DatabaseApi.deleteDoc("hikes", hikeId).then((message) => {
                        props.reloadPageFunc();
                      });
                    }}
                    style={{ width: 100, backgroundColor: "red" }}
                  >
                    {" "}
                    Slett
                  </Button>
                </Col>
              ) : (
                <p></p>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {
        (String(currentUserId) !== String(organizer.id)) ?
        participantsIdList.includes(currentUserId) ? (
          <Button
            className="p-2 m-2"
            variant="danger"
            type="submit"
            size="lg"
            onClick={() => {
              removeParticipantFromHike(currentUserId, hikeId);
            }}
          >
            Meld av
          </Button>
        ) : (
          <Button
            className="p-2 m-2"
            variant="success"
            type="submit"
            size="lg"
            onClick={() => {
              addParticipantToHike(currentUserId, hikeId);
            }}
          >
            Meld på
          </Button>
        )
        :
        null
      }
    </Card>
  );
};

export default HikeView;
