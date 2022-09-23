/**
 * @author Johan Solbakken <johsol@stud.ntnu.no>
 */

import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import DatabaseApi from "../api/DatabaseAPI";
import { UserContext } from "../App";
// import {
//   auth, fetchHikesByUId,
// } from "../firebase-config";
import HikeView from "./HikeView";

// LIST OF HIKES
const ListOfHikes = (props) => {
  const userContext = useContext(UserContext);
  const currentUserId = userContext;
  
  const [hikes, setHikes] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
    DatabaseApi.fetchHikesByUid(currentUserId)
    .then((new_hikes) => {
      setHikes(new_hikes);
    })
    .catch((error) => {
      console.log(error);
    });
    setReload(false);
  }
  }, [currentUserId, reload]);

  const arr = [];
  hikes.forEach((hike) => {
    arr.push(
        <HikeView data={hike} key={hike.id} reloadPageFunc={() => {setReload(true);}}/>
    );
  });

  return <Container
  className="m-3"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "black",
  }}
>
  {arr}
</Container>;
};

// MY HIKES PAGE

const MyHikesPage = (props) => {
  const userContext = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    if (!userContext) {
      nav("/", { replace: true });
    }
  }, [userContext, nav]);

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Turer der du er påmeldt</h1>
      {/* TODO: Fjerne inline styling!*/}
      <ListOfHikes />
    </Container>
  );
};

export default MyHikesPage;
