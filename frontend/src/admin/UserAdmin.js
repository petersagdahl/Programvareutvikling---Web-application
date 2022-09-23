/**
 * @author Johan Solbakken <johsol@stud.ntnu.no>
 */

import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import DatabaseApi from "../api/DatabaseAPI";
//import { fetchUsers, delDoc } from "../firebase-config";

const UserAdmin = () => {
  let [users, setUsers] = useState([]);
  const [reload, setReload] = useState(true);

  // useEffect is used here with empty brackets at the end because it shall only run once. It will rerun when user is refreshing site. If there is an error, it will run in the catch.
  useEffect(() => {
    if (reload) {
    DatabaseApi.fetchUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
      setReload(false);
    }
  }, [reload]);

  function delUser(user) {
    console.log("Delete");
  }

  // This is the list that will be displayed in the table.
  const list = [];
  users.forEach((user) => {
    list.push(
      <tr key={user.id}>
        <th>{user.id}</th>
        <th>{user.email}</th>
        <th>{user.firstName}</th>
        <th>{user.surname}</th>
        <th>{user.dateOfBirth}</th>
        <th>{user.phone}</th>
        <td>
          <Button
            onClick={() => {
              //</td>delDoc('users', user.id)
              DatabaseApi.deleteDoc("users", user.id);
              setReload(true);
            }}
          >
            Slett
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <h2>Bruker-admin</h2>
      <Table style={{ color: "white" }}>
        <thead>
          <tr>
            <th>UID</th>
            <th>E-post</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Fødselsdato</th>
            <th>Tlf.nr</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </Table>
    </Container>
  );
};

export default UserAdmin;
