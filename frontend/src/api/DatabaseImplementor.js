
const notImplemented = () => {
    return new Promise((resolve, reject) => {
        reject("Not implemented");
    })
}

class DatabaseImplementor
{
// Authentication

logInWithEmailAndPassword = (email, password) => {
    return notImplemented();
}

registerWithEmailAndPassword = (email, password, user) => {
    return notImplemented();
}

logout = () => {
    return notImplemented();
};

onAuthStateChanged = (func) => {
    return notImplemented();
}



// Current user
isCurrentUserAdmin = () => {
    return notImplemented();
}

fetchUsers = () => {
    return notImplemented();
}

fetchCurrentUser = () => {
    return notImplemented();
}

fetchUserById = (id) => {
    return notImplemented();
}

fetchUsersByIds = (ids) => {
    return notImplemented();
}


// Hikes
createNewHike = (hike) => {
    return notImplemented();
}

updateHike = (hike) => {
    return notImplemented();
}

fetchHikes = () => {
    return notImplemented();
}

deleteHike = (id) => {
    return notImplemented();
}

addParticipantToHike = (hikeId, userId) => {
    return notImplemented();
}

removeParticipantFromHike = (hikeId, userId) => {
    return notImplemented();
}

fetchHikesByUid = (ids) => {
    return notImplemented();
}

// Misc
deleteDoc = (collectionName, id) => {
    return notImplemented();
}
}

export default DatabaseImplementor