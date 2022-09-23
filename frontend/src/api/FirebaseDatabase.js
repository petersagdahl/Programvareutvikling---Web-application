import { onAuthStateChanged } from "firebase/auth";

const { default: DatabaseImplementor } = require("./DatabaseImplementor");
const { auth, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, isCurrentUserAdmin, fetchUsers, fetchUser, fetchUserByUId, fetchUsersByUId, createNewHike, updateHike, fetchHikes, deleteHikeFromDB, addParticipant, removeParticipant, fetchHikesByUId, delDoc } = require("./firebase-config");

class FirebaseImplementor extends DatabaseImplementor {
  // Authentication

  logInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        logInWithEmailAndPassword(email, password);
        resolve("Hei");
    });
  };

  registerWithEmailAndPassword = (email, password, user) => {
    return new Promise((resolve, reject) => {
        registerWithEmailAndPassword(email, password, user);
        resolve("Done!");
    });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
        resolve(logout());
    });
  };

  onAuthStateChanged = (func) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, func);
      resolve("Helo");
    });
  }

  // Current user
  isCurrentUserAdmin = () => {
    return new Promise((resolve, reject) => {
        resolve(isCurrentUserAdmin);
    });;
  };

  fetchUsers = () => {
    return new Promise((resolve, reject) => {
        fetchUsers.then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  fetchCurrentUser = () => {
    return new Promise((resolve, reject) => {
        fetchUser.then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  fetchUserById = (id) => {
    return new Promise((resolve, reject) => {
        fetchUserByUId(id).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  fetchUsersByIds = (ids) => {
    return new Promise((resolve, reject) => {
        fetchUsersByUId(ids).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  // Hikes
  createNewHike = (hike) => {
    return new Promise((resolve, reject) => {
        const title = hike.title;
        const startDate = hike.startDate;
        const startTime = hike.startTime;
        const endDate = hike.endDate;
        const endTime = hike.endTime;
        const length = hike.length;
        const difficulty = hike.difficulty;
        const startPos = hike.startPosition;
        const endPos = hike.endPosition;
        const equiptment = hike.equiptment;
        const participants = hike.participants;
        const organizer = hike.organizer;
        const price = hike.price;

        createNewHike(title, startDate, startTime, endDate, endTime, length, difficulty, startPos, endPos, equiptment, participants, organizer, price).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  updateHike = (hike) => {
    return new Promise((resolve, reject) => {
        updateHike(hike).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  fetchHikes = () => {
    return new Promise((resolve, reject) => {
        fetchHikes.then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  deleteHike = (id) => {
    return new Promise((resolve, reject) => {
        deleteHikeFromDB(id).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  addParticipantToHike = (hikeId, userId) => {
    return new Promise((resolve, reject) => {
        addParticipant(userId, hikeId).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  removeParticipantFromHike = (hikeId, userId) => {
    return new Promise((resolve, reject) => {
        removeParticipant(userId, hikeId).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  fetchHikesByUid = (ids) => {
    return new Promise((resolve, reject) => {
        fetchHikesByUId(ids).then(result => resolve(result)).catch(error => reject(error));
    });;
  };

  

  // Misc
  deleteDoc = (collectionName, id) => {
    return new Promise((resolve, reject) => {
        delDoc(collectionName, id);
        resolve(true);
    });;
  };
}


export default FirebaseImplementor;