import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";
import Navbar from "./components/navbar";
//import { auth, fetchUser, logout } from "./firebase-config";
import UserPage from "./userPage";
import AdminPage from "./admin";
import HikeCreatorPage from "./hikePage/HikeCreatorPage";
import HikeList from "./hikePage/HikeList";
import MyHikesPage from "./hikePage/MyHikesPage";
import HikeEditPage from "./hikePage/HikeEditPage";
import DatabaseApi from "./api/DatabaseAPI";

export const UserContext = React.createContext("");
export const AdminContext = React.createContext(false);
export const CommercialContext = React.createContext(false);

export const useFirebase = false;

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCommercialUser, setIsCommercialUser] = useState(false);

  DatabaseApi.onAuthStateChanged((user) => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId("");
    }
  }).then((id) => {
    if (id) {
      setUserId(id);
      
    }
  });

  useEffect(() => {
    setShowNavbar(!!userId);

    if (userId) {
      DatabaseApi.fetchCurrentUser().then((user) => {
        setUserId(user.id);
        setIsAdmin(user.isAdmin);
        setIsCommercialUser(user.isCommercial);
      });

      // const user = fetchUser.then((user) => {
      //   console.log("Er jeg en admin? ", user.isAdmin);
      //   setIsAdmin(user.isAdmin);
      // });
    }
  }, [userId]);



  return (
    <div className="App">
      <div>
        <UserContext.Provider value={userId}>
          <AdminContext.Provider value={isAdmin}>
            <CommercialContext.Provider value={isCommercialUser}>
              <Router>
                {
                  /** NAVBAR */
                  showNavbar && (
                    <Navbar
                      buttons={[
                        {
                          text: "Lag en ny tur",
                          page: "/hike/create",
                        },
                        {
                          text: "Se alle turer",
                          page: "/hike/list",
                        },
                        {
                          text: "Påmeldte turer",
                          page: "/hike/list/user",
                        },
                        isAdmin ? {
                          text: "Adminpanel",
                          page: "/admin",
                        } : null,
                        {
                          text: "Logout",
                          callback: () => {
                            DatabaseApi.logout();
                          },
                        },
                      ]}
                    />
                  )
                  /** NAVBAR end */
                }
                {!userId ? (
                  <LoginPage />
                ) : (
                  <Routes>
                    <Route
                      // @ts-ignore
                      exact
                      path="/hike"
                      element={<p>Ingenting</p>}
                    />
                    <Route
                      // @ts-ignore
                      exact
                      path="/user"
                      element={<UserPage />}
                    ></Route>
                    <Route
                      // @ts-ignore
                      exact
                      path="/hike/list"
                      element={<HikeList />}
                    />
                    <Route path="/hike/list/user" element={<MyHikesPage />} />
                    <Route
                      // @ts-ignore
                      exact
                      path="/hike/create"
                      element={<HikeCreatorPage />}
                    />

                    <Route
                      // @ts-ignore
                      exact
                      path="/admin"
                      element={<AdminPage />}
                    />
                    <Route
                      // @ts-ignore
                      exact
                      path="/hike/edit"
                      element={<HikeEditPage />}
                    />
                  </Routes>
                )}
              </Router>
            </CommercialContext.Provider>
          </AdminContext.Provider>
        </UserContext.Provider>
      </div>
    </div>
  );
};

export default App;
