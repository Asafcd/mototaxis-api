const db = require('../../firebase')

//const db = getFirestore(firebase)

const createLocation = async (ID, body) => {
  try {
    //console.log(firebaseApp)
    const res = await db.collection('Location').doc(ID).set(body);
    return res;
  } catch (error) {
    throw { status: 500, error};
  }
};

const getLocations = async() => {
  try {
    const locations = await db.collection('Location').get();
    console.log(locations.docs)
    let locationsData = []
    /* snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    }); */
    return locations;
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getLocation = (id) => {
  try {
    return location;
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateLocation = (id, body) => {
  try {
    return location;
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const deleteLocation = (id) => {
  try {
    return location;
  } catch (error) {
    throw { status: 500, error: error };
  }
};

module.exports = {
  createLocation,
  getLocation,
  getLocations,
  updateLocation,
  deleteLocation,
};
