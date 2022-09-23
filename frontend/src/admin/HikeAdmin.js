import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import DatabaseApi from "../api/DatabaseAPI";
//import { fetchHikes, database, delDoc } from '../firebase-config';

const HikeAdmin = () => {
  const [hikes, setHikes] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
    DatabaseApi.fetchHikes()
      .then((hikes) => {
        setHikes(hikes);
      })
      .catch((error) => {
        console.error(error);
      });
      setReload(false);
    }
  }, [reload]);

  // This is the list that will be displayed in the table.
  const list = [];
  hikes.forEach((hike) => {
    list.push(
      <tr key={hike.id}>
        <th>{hike.id}</th>
        <th>{hike.title}</th>
        <th>{hike.startDate}</th>
        <th>{hike.startTime}</th>
        <th>{hike.endDate}</th>
        <th>{hike.endTime}</th>
        <th>{hike.length}</th>
        <th>{hike.difficulty}</th>
        <th>{hike.startPosition}</th>
        <th>{hike.endPosition}</th>
        <th>{hike.equipment}</th>
        <td>
          <Button
            onClick={() => {
              //delDoc("hikes", hike.id)
              DatabaseApi.deleteDoc("hikes", hike.id);
              setReload(true);
            }}
          >
            Slett
          </Button>
        </td>
      </tr>
    );
  });

  /*
    
  const deleteHike = (id) => {
    console.log(id)
    database.firestore().collection('users').doc(id).delete()
        .then(()=>{console.log("successfully deleted! ")})
        .catch((error)=>{ console.log("Error removing document:", error)})
  }

*/
  return (
    <Container style={{ marginTop: "3em" }}>
      <h2>Hike-admin</h2>
      <Table style={{ color: "white" }}>
        <thead>
          <tr>
            <th>HID</th>
            <th>Title</th>
            <th>Startdato</th>
            <th>Starttid</th>
            <th>Sluttdato</th>
            <th>Sluttid</th>
            <th>Lengde</th>
            <th>Vanskelighetsgrad</th>
            <th>Startposisjon</th>
            <th>Sluttposisjon</th>
            <th>Utstyr</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

export default HikeAdmin;
