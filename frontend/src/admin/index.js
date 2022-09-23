/**
 * @author Johan Solbakken <johsol@stud.ntnu.no>
 * @author Jathavaan Shankarr <jathavas@stud.ntnu.no>
 * @purpose Admin page for users with admin privileges.
 */

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext, UserContext } from "../App";
import HikeAdmin from "./HikeAdmin";
import UserAdmin from "./UserAdmin";
const { Container } = require("react-bootstrap");

const AdminPage = (props) => {
    const userContext = useContext(UserContext);
    const adminContext = useContext(AdminContext);
    const nav = useNavigate();
    useEffect(() => {
      if (!userContext) {
        nav("/", { replace: true });
      } 
      if (!adminContext)
      {
        nav("/", {replace: true});
      }
    }, [userContext, adminContext, nav]);
    
  return (
    <Container style={{color: "white"}}>
      <h1>Adminpanel</h1>
      <UserAdmin />
      <HikeAdmin />
    </Container>
  );
};

export default AdminPage;
