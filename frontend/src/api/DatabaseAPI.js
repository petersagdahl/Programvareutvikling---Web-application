import FirebaseImplementor from "./FirebaseDatabase";

const { default: DatabaseImplementor } = require("./DatabaseImplementor");
const { default: MockImplementor } = require("./MockDatabase");

class DatabaseAPI
{
    #impl

    constructor(impl)
    {
        if (!(impl instanceof DatabaseImplementor))
        {
            throw new Error("Not an database-implementor");
        }

        this.#impl = impl;
    }

    setImplementor = (impl) => {
        if (!(impl instanceof DatabaseImplementor))
        {
            throw new Error("Not an database-implementor");
        }
        
        this.#impl = impl;
    }

    // Authentication

    onAuthStateChanged = (func) => {
        return this.#impl.onAuthStateChanged(func);
    }

    logInWithEmailAndPassword = (email, password) => {
        return this.#impl.logInWithEmailAndPassword(email, password)
    }

    registerWithEmailAndPassword = (email, password, user) => {
        return this.#impl.registerWithEmailAndPassword(email, password, user);
    }

    logout = () => {
        return this.#impl.logout();
    };



    // Current user
    isCurrentUserAdmin = () => {
        return this.#impl.isCurrentUserAdmin();
    }

    fetchUsers = () => {
        return this.#impl.fetchUsers();
    }

    fetchCurrentUser = () => {
        return this.#impl.fetchCurrentUser();
    }

    fetchUserById = (id) => {
        return this.#impl.fetchUserById(id);
    }

    fetchUsersByIds = (ids) => {
        return this.#impl.fetchUsersByIds(ids);
    }



    // Hikes
    createNewHike = (hike) => {
        return this.#impl.createNewHike(hike);
    }

    updateHike = (hike) => {
        return this.#impl.updateHike(hike);
    }

    fetchHikes = () => {
        return this.#impl.fetchHikes();
    }

    deleteHike = (id) => {
        return this.#impl.deleteHike(id);
    }

    addParticipantToHike = (hikeId, userId) => {
        return this.#impl.addParticipantToHike(hikeId, userId);
    }

    removeParticipantFromHike = (hikeId, userId) => {
        return this.#impl.removeParticipantFromHike(hikeId, userId);
    }

    fetchHikesByUid = (ids) => {
        return this.#impl.fetchHikesByUid(ids);
    }

    


    // Misc
    deleteDoc = (collectionName, id) => {
        return this.#impl.deleteDoc(collectionName, id);
    }
}

const DatabaseApi = new DatabaseAPI(new MockImplementor());
export default DatabaseApi;