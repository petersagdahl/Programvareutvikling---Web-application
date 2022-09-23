/**
 * @author Johan Solbakken <johsol@stud.ntnu.no>
 */

// Import the functions you need from the SDKs you need
import "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import User from "../model/user";
import Hike from "../model/hike";
import { useFirebase } from "../App";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCDR-cG_GzI9E5R3gftzl08UbC3JvKjMzQ",

  authDomain: "gotur-8ef83.firebaseapp.com",

  databaseURL:
    "https://gotur-8ef83-default-rtdb.europe-west1.firebasedatabase.app/",

  projectId: "gotur-8ef83",

  storageBucket: "gotur-8ef83.appspot.com",

  messagingSenderId: "77640405906",

  appId: "1:77640405906:web:ae885423f1875f3f8d274b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Will be used later
const database = getDatabase(app);
const db = getFirestore();
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
  let uid = "";

  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Login successful
        const user = userCredentials.user;
        return true;
      })
      .catch((error) => {
        // Login failed
        console.log(error.message);
        return false;
      });
  } catch (err) {
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password, user) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const userR = res.user;

    const firestore = getFirestore();
    const hikeCollection = collection(firestore, "users");
    async function addANewDocument() {
      await addDoc(hikeCollection, {
        uid: userR.uid,
        firstName: user.firstName,
        surname: user.surname,
        authProvider: "local",
        email: user.email,
        phone: user.phone,
        dob: user.dateOfBirth,
        isAdmin: false,
        isCommercial: user.isCommercial,
      });
    }
    addANewDocument();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const logout = () => {
  signOut(auth);
  if (!auth.currentUser) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns true if current user is admin
 * @returns isAdmin
 */
const isCurrentUserAdmin = () => {
  // TODO: Implement method to check if current user is admin.
  return false;
};

/**
 * A promise for fetching users and converts the data into a list of User objects.
 * Usage:
 *  fetchUsers
 *    .then(users => {//handle list of users})
 *    .catch(error => {console.log(error)})
 */
const fetchUsers = new Promise(async (resolve, reject) => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    let users = [];
    querySnapshot.forEach((doc) => {
      let user = new User();
      user.id = doc.id;
      user.firstName = doc.data()["firstname"];
      user.surname = doc.data()["surname"];
      user.phone = doc.data()["phone"];
      user.email = doc.data()["email"];
      user.isCommercial = doc.data()["isCommercial"];
      // TODO: Unhandled Promise Rejection: Error: Fødselsdato er på feil format
      //    Must fix the user class such that we have arguments are the same in firebase and classes
      //user.dateOfBirth = doc.data()["dob"];
      users.push(user);
    });
    resolve(users);
  } else {
    reject("Failed to fetch users!§");
  }
});

const fetchUser = new Promise(async (resolve, reject) => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  if (auth.currentUser === null) {
    return;
  }
  if (!querySnapshot.empty) {
    const user = new User();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data["uid"] === auth.currentUser.uid) {
        user.firstName = data["firstName"];
        user.surname = data["surname"];
        user.email = data["email"];
        user.phone = data["phone"];
        user.dateOfBirth = data["dob"];
        user.isAdmin = data["isAdmin"];
        user.isCommercial = data["isCommercial"];
      }
    });
    resolve(user);
  } else {
    reject("Failed to fetch user!");
  }
});

const createNewHike = async (
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  length,
  difficulty,
  startPosition,
  endPosition,
  equipment,
  participants,
  organizer,
  price
) => {
  try {
    const firestore = getFirestore();
    const hikeCollection = collection(firestore, "hikes");
    async function addANewDocument() {
      await addDoc(hikeCollection, {
        title: title,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        length: length,
        difficulty: difficulty,
        startPosition: startPosition,
        endPosition: endPosition,
        equipment: equipment,
        participants: participants,
        organizer: organizer,
        price: price,
      });
    }
    addANewDocument();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const updateHike = async (hike) => {
  const originalHike = doc(db, "hikes", hike.id);
  await updateDoc(originalHike, {
    title: hike.title,
    startDate: hike.startDate,
    startTime: hike.startTime,
    endDate: hike.endDate,
    endTime: hike.endTime,
    length: hike.length,
    difficulty: hike.difficulty,
    startPosition: hike.startPosition,
    endPosition: hike.endPosition,
    equipment: hike.equipment,
    organizer: auth.currentUser.uid,
    price: hike.price,
  });
};

const fetchHikes = new Promise(async (resolve, reject) => {
  const q = query(collection(db, "hikes"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    let hikes = [];
    querySnapshot.forEach((doc) => {
      let hike = new Hike();
      const data = doc.data();

      hike.id = doc.id;
      hike.title = data["title"];
      hike.startDate = data["startDate"];
      hike.endDate = data["endDate"];
      hike.startTime = data["startTime"];
      hike.endTime = data["endTime"];
      hike.length = data["length"];
      hike.length = data["length"];
      hike.difficulty = data["difficulty"];
      hike.startPosition = data["startPosition"];
      hike.endPosition = data["endPosition"];
      hike.equipment = data["equipment"];
      hike.price = data["price"];

      data["participants"].forEach((p) => {
        hike.participants.push(p);
      });

      hike.organizer = data["organizer"];

      hikes.push(hike);
    });
    resolve(hikes);
  } else {
    reject("Failed to fetch hikes!");
  }
});

const delDoc = (collectionName, id) => {
  deleteDoc(doc(db, collectionName, id));
};

const deleteHikeFromDB = async (hikeID) => {
  return new Promise(async (resolve, reject) => {
    await deleteDoc(doc(db, "hikes", hikeID));
    console.log("Deleted hike");
  });
};

const addParticipant = (uid, hikeID) => {
  return new Promise(async (resolve, reject) => {
    const hikeCollection = collection(db, "hikes");
    const hikeReference = doc(hikeCollection, hikeID);
    const documentReference = getDoc(hikeReference);

    console.log("PRintær ");

    documentReference
      .then((doc) => {
        console.log("DOKUMENT", doc.data());
        const hID = doc.id;
        const hike = doc.data();

        if (hID === hikeID) {
          const participants = hike["participants"];
          const organizer = hike["organizer"];

          if (uid !== organizer) {
            if (!participants.includes(uid)) {
              participants.push(uid);
              updateDoc(hikeReference, { participants: participants })
                .then((_) => {
                  console.log("Nå er du meldt på!");
                  resolve("God tur");
                })
                .catch((error) => {
                  console.log("Du er ikke meldt på 😀");
                  reject(error);
                });
            }
          }
        }
      })
      .catch((error) => {
        console.log("problem", error);
      });
  });
};

const removeParticipant = async (uid, hikeID) => {
  return new Promise(async (resolve, reject) => {
    const hikeCollection = collection(db, "hikes");
    const hikeReferanse = doc(hikeCollection, hikeID);
    const documentReferanse = getDoc(hikeReferanse);

    documentReferanse.then((doc) => {
      console.log("DOKUMENT", doc.data());
      const hID = doc.id;
      const hike = doc.data();

      if (hID === hikeID) {
        const participants = hike["participants"];
        const organizer = hike["organizer"];

        let newParticipants = [];

        if (uid !== organizer) {
          if (participants.includes(uid)) {
            participants.forEach((p) => {
              if (p !== uid) {
                newParticipants.push(uid);
              }
            });
            updateDoc(hikeReferanse, { participants: newParticipants })
              .then((noe) => {
                console.log("Å fjerne mannen var en suksess");
                resolve("Ikke god tur");
              })
              .catch((error) => {
                console.log("Å fjerne mannen var ikke en suksess");
                reject(error);
              });
          }
        }
      }
    });
  });
};

const fetchUserByUId = (uid) => {
  return new Promise(async (resolve, reject) => {
    const users = collection(db, "users");

    const q = query(users, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let user = new User();
      querySnapshot.forEach((doc) => {
        user.id = doc.data()["uid"];
        user.firstName = doc.data()["firstName"];
        user.surname = doc.data()["surname"];
        user.phone = doc.data()["phone"];
        user.email = doc.data()["email"];
        user.isCommercial = doc.data["isCommercial"];
      });
      resolve(user);
    } else {
      resolve("");
    }
  });
};

const fetchUsersByUId = (uids) => {
  return new Promise(async (resolve, reject) => {
    if (uids.length === 0) {
      resolve([]);
    } else {
      const usersCollection = collection(db, "users");

      const q = query(usersCollection, where("uid", "in", uids));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        let users = [];
        querySnapshot.forEach((doc) => {
          let user = new User();
          user.id = doc.data()["uid"];
          user.firstName = doc.data()["firstName"];
          user.surname = doc.data()["surname"];
          user.phone = doc.data()["phone"];
          user.email = doc.data()["email"];
          user.isCommercial = doc.data()["isCommercial"];

          users.push(user);
        });
        resolve(users);
      } else {
        resolve([]);
      }
    }
  });
};

const onAuthStateChanged = (func) => {
  auth.onAuthStateChanged(func);
};

const fetchHikesByUId = (uid) => {
  return new Promise(async (resolve, reject) => {
    const hikesCollection = collection(db, "hikes");

    const q = query(
      hikesCollection,
      where("participants", "array-contains", uid)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let hikes = [];
      querySnapshot.forEach((doc) => {
        let hike = new Hike();
        const data = doc.data();

        hike.id = doc.id;
        hike.title = data["title"];
        hike.startDate = data["startDate"];
        hike.endDate = data["endDate"];
        hike.startTime = data["startTime"];
        hike.endTime = data["endTime"];
        hike.length = data["length"];
        hike.length = data["length"];
        hike.difficulty = data["difficulty"];
        hike.startPosition = data["startPosition"];
        hike.endPosition = data["endPosition"];
        hike.equipment = data["equipment"];
        hike.participants = data["participants"];
        hike.organizer = data["organizer"];
        hike.price = data["price"];

        hikes.push(hike);
      });
      resolve(hikes);
    } else {
      resolve([]);
    }
  });
};

export {
  database,
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  createNewHike,
  logout,
  isCurrentUserAdmin,
  fetchUsers,
  fetchHikes,
  fetchUser,
  delDoc,
  updateHike,
  fetchUserByUId,
  fetchUsersByUId,
  deleteHikeFromDB,
  addParticipant,
  removeParticipant,
  fetchHikesByUId,
};
