/**
 * @author Jathavaan Shankarr
 * @author Johan Solbakken <johsol@stud.ntnu.no>
 * @coauthor Martina Steen
 * @coauthor Karoline Stabell
 * @purpose Shows all the hikes that have been created
 */

import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router";
import DatabaseApi from "../api/DatabaseAPI";
import { UserContext } from "../App";
//import { fetchHikes } from "../firebase-config";
import HikeView from "./HikeView";

const HikeList = () => {
  const userContext = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    if (!userContext) {
      nav("/", { replace: true });
    }
  }, [userContext, nav]);

  const [reload, setReload] = useState(true);
  const [hikeList, setHikeList] = useState([]);
  useEffect(() => {
    if (reload) {
      DatabaseApi.fetchHikes()
        .then((hikes) => {
          console.log("Hello");
          setHikeList(hikes);
        })
        .catch((error) => {
          console.error(error);
        });
      setReload(false);
    }
  }, [reload]);

  const list = [];
  hikeList.forEach((hike) => {
    list.push(<HikeView data={hike} reloadPageFunc={() => { setReload(true); }}/>);
  });

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Turer i ditt nærområde</h1>
      <Container
        className="m-3"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "black",
        }}
      >
        {list}
      </Container>
    </Container>
  );
};

export default HikeList;
