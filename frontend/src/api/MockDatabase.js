import Hike from "../model/hike";
import User from "../model/user";
import DatabaseImplementor from "./DatabaseImplementor";

class MockImplementor extends DatabaseImplementor {
  #users = [];
  #currentUser;

  #emailAndPassword = [];
  #userCounter = 100;

  #hikes = [];
  #hikeCounter = 100;

  #authStateFunc = (user) => {};

  constructor() {
    super();

    const user1 = new User();
    user1.id = "1";
    user1.firstName = "Ola";
    user1.surname = "Halvorsen";
    user1.email = "ola@gmail.com";
    user1.phone = "+4798765432";
    user1.isAdmin = true;
    user1.isCommercial = false;
    user1.dateOfBirth = "1980-01-17";
    this.#users.push(user1);
    this.#currentUser = user1;

    this.#emailAndPassword.push({
      id: user1.id,
      email: user1.email,
      password: "jegErAdmin1",
    });

    const user2 = new User();
    user2.id = "2";
    user2.firstName = "Jens";
    user2.surname = "Morrna";
    user2.email = "Jens.Mogen@morrna.com";
    user2.phone = "+4745674567";
    user2.isAdmin = false;
    user2.isCommercial = false;
    user2.dateOfBirth = "1997-02-16";
    this.#users.push(user2);

    this.#emailAndPassword.push({
      id: user2.id,
      email: user2.email,
      password: "jegerAdmin1",
    });

    const user3 = new User();
    user3.id = "3";
    user3.firstName = "Tora";
    user3.surname = "Torskesaus";
    user3.email = "tora@toro.no";
    user3.phone = "+4740469420";
    user3.isAdmin = true;
    user3.isCommercial = false;
    user3.dateOfBirth = "1993-01-22";
    this.#users.push(user3);

    this.#emailAndPassword.push({
      id: user3.id,
      email: user3.email,
      password: "jegerAdmin7",
    });

    const user4 = new User();
    user4.id = "4";
    user4.firstName = "Stor Aktør AS";
    user4.surname = "Aktorer";
    user4.email = "aktor@aktor.no";
    user4.phone = "+4740469420";
    user4.isAdmin = false;
    user4.isCommercial = true;
    user4.dateOfBirth = "1993-01-22";
    this.#users.push(user4);

    this.#emailAndPassword.push({
      id: user4.id,
      email: user4.email,
      password: "jegerAdmin7",
    });

    const user5 = new User();
    user5.id = "5";
    user5.firstName = "System";
    user5.surname = "Admin";
    user5.email = "admin@system.no";
    user5.phone = "+4740469420";
    user5.isAdmin = true;
    user5.isCommercial = false;
    user5.dateOfBirth = "1993-01-22";
    this.#users.push(user5);

    this.#emailAndPassword.push({
      id: String(user5.id),
      email: String(user5.email),
      password: "jegErAdmin1",
    });

    const hike1 = new Hike();
    hike1.id = "1";
    hike1.title = "Tur til alpene";
    hike1.startDate = "16/05/2022";
    hike1.endDate = "17/05/2022";
    hike1.startTime = "13:00";
    hike1.endTime = "15:00";
    hike1.length = 5;
    hike1.difficulty = "Middels";
    hike1.startPosition = "Prinseveien 8, 7045 Trondheim";
    hike1.endPosition = "Prinseveien 8, 7045 Trondheim";
    hike1.equipment = "Ta med spade.";
    hike1.participants = ["2"];
    hike1.organizer = "1";
    hike1.price = 0;
    this.#hikes.push(hike1);

    const hike2 = new Hike();
    hike2.id = "2";
    hike2.title = "Liseberg";
    hike2.startDate = "14/05/2022";
    hike2.endDate = "19/05/2022";
    hike2.startTime = "09:00";
    hike2.endTime = "23:00";
    hike2.length = 120;
    hike2.difficulty = "Vanskelig";
    hike2.startPosition = "Prinseveien 8, 7045 Trondheim";
    hike2.endPosition = "Sverige 8, 9999 Gothenburg";
    hike2.equipment = "Ta med morro!";
    hike2.participants = ["1"];
    hike2.organizer = "2";
    hike2.price = 100;
    this.#hikes.push(hike2);

    const hike3 = new Hike();
    hike3.id = "4";
    hike3.title = "VIP tur til Ibiza";
    hike3.startDate = "16/05/2022";
    hike3.endDate = "20/05/2022";
    hike3.startTime = "09:00";
    hike3.endTime = "23:00";
    hike3.length = 120;
    hike3.difficulty = "Vanskelig";
    hike3.startPosition = "Prinseveien 8, 7045 Ibiza";
    hike3.endPosition = "Sverige 8, 9999 Ibiza";
    hike3.equipment = "Ta med morro!";
    hike3.participants = ["1", "2"];
    hike3.organizer = "4";
    hike3.price = 1000;
    this.#hikes.push(hike3);
  }

  // Authentication
  logInWithEmailAndPassword = (email, password) => {
    console.log("logInWithEmailAndPassword");
    return new Promise((resolve, reject) => {
      this.#emailAndPassword.forEach((credentials) => {
        if (String(credentials.email) === String(email) && String(credentials.password) === String(password)) {
          console.log("Logga inn!");
          this.#currentUser = this.#users.find(
            (user) => user.id === credentials.id
          );
          this.#authStateFunc({ uid: this.#currentUser.id });
          resolve(this.#currentUser);
          return;
        }
      });
      reject("Could not log in");
    });
  };

  registerWithEmailAndPassword = (email, password, user) => {
    console.log("registerWithEmailAndPassword");
    return new Promise((resolve, reject) => {
      let emailFound = false;
      let id = "";

      this.#emailAndPassword.forEach((credential) => {
        if (credential.email === email) {
          emailFound = true;
          reject("Email found");
        }
      });

      if (!emailFound) {
        console.log("Lager ny bruker");
        id = String(this.#userCounter);
        this.#userCounter++;
        user.id = id;
        this.#users.push(user);
        console.log("Lager kommersiell bruker?", user.isCommercial);
        this.#emailAndPassword.push({
          id: id,
          email: email,
          password: password,
        });
        this.#currentUser = user;
        this.#authStateFunc({ uid: this.#currentUser.id });
        resolve(user);
      }
    });
  };

  logout = () => {
    console.log("logout");
    return new Promise((resolve, reject) => {
      this.#currentUser = undefined;
      this.#authStateFunc({ uid: "" });
      resolve(true);
    });
  };

  onAuthStateChanged = (func) => {
    console.log("onAuthStateChanged");
    this.#authStateFunc = func;
    return new Promise((resolve, reject) => {
      if (this.#currentUser !== undefined)
        resolve(this.#currentUser.id);
      else
        reject("");
    });
  };

  // Current user
  isCurrentUserAdmin = () => {
    console.log("isCurrentUserAdmin");
    return new Promise((resolve, reject) => {
      resolve(this.#currentUser.isAdmin);
    });
  };

  fetchUsers = () => {
    console.log("fetchUsers");
    return new Promise((resolve, reject) => {
      resolve(this.#users);
    });
  };

  fetchCurrentUser = () => {
    console.log("fetchCurrentUser");
    return new Promise((resolve, reject) => {
      resolve(this.#currentUser);
    });
  };

  fetchUserById = (id) => {
    console.log("fetchUserById");
    return new Promise((resolve, reject) => {
      this.#users.forEach((user) => {
        if (String(user.id) === String(id)) {
          resolve(user);
        }
      });
      reject("Could not find user");
    });
  };

  fetchUsersByIds = (ids) => {
    console.log("fetchUsersByIds");
    return new Promise((resolve, reject) => {
      if (ids.length === 0) {
        resolve([]);
      } else {
        let users = [];
        this.#users.forEach((user) => {
          ids.forEach((uid) => {
            if (String(user.id) === String(uid)) {
              users.push(user);
            }
          });
        });
        resolve(users);
      }
    });
  };

  // Hikes
  createNewHike = (hike) => {
    console.log("createNewHike");
    return new Promise((resolve, reject) => {
      hike.id = this.#hikeCounter;
      this.#hikeCounter++;
      this.#hikes.push(hike);
      resolve(true);
    });
  };

  updateHike = (hike) => {
    console.log("updateHike");
    return new Promise((resolve, reject) => {
      this.#hikes = this.#hikes.filter(
        (hikeInArray) => String(hikeInArray.id) !== String(hike.id)
      );
      this.#hikes.push(hike);
    });
  };

  fetchHikes = () => {
    console.log("fetchHikes");
    return new Promise((resolve, reject) => {
      resolve(this.#hikes);
    });
  };

  deleteHike = (id) => {
    console.log("deleteHike");
    return new Promise((resolve, reject) => {
      this.#hikes = this.#hikes.filter((hike) => String(hike.id) !== String(id));
    });
  };

  addParticipantToHike = (hikeId, userId) => {
    console.log("addParticipantToHike");
    return new Promise((resolve, reject) => {
      this.#hikes.forEach((hike) => {
        if (String(hike.id) === String(hikeId)) {
          hike.participants.push(userId);
          resolve(true);
        }
      });
      reject(false);
    });
  };

  removeParticipantFromHike = (hikeId, userId) => {
    console.log("removeParticipantFromHke");
    return new Promise((resolve, reject) => {
      this.#hikes.forEach((hike) => {
        if (String(hike.id) === String(hikeId)) {
          hike.participants = hike.participants.filter((uid) => String(uid) !== String(userId));
          resolve(true);
        }
      });
      reject(false);
    });
  };

  fetchHikesByUid = (id) => {
    console.log("fetchHikesByIds");
    console.log("Bruker: ", id);
    return new Promise((resolve, reject) => {
      const hikes = [];
      this.#hikes.forEach((hike) => {
        hike.participants.forEach((userId) => {
          if (String(id) === String(userId)) {
            hikes.push(hike);
          }
        });
      });
      resolve(hikes);
    });
  };

  // Misc
  deleteDoc = (collectionName, id) => {
    console.log("deleteDoc");
    return new Promise((resolve, reject) => {
      if (collectionName === "hikes") {
        this.#hikes = this.#hikes.filter(
          (hike) => String(hike.id) !== String(id)
        );
        resolve(true);
      } else if (collectionName === "users") {
        this.#users = this.#users.filter(
          (user) => String(user.id) !== String(id)
        );
        resolve(true);
      } else {
        reject("Collection does not exist");
      }
    });
  };
}

export default MockImplementor;
