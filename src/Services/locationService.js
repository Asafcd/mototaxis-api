const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const createLocation = async (ID, body) => {
  try {
    const res = await db.collection('Location').doc(ID).set(body);
    /*  Add a new document with a generated id.
    const res = await db.collection('cities').add({
      name: 'Tokyo',
      country: 'Japan'
    }); */

    return res;
  } catch (error) {
    throw { status: 500, error};
  }
};

const getLocations = async() => {
  try {
    const locations = await db.collection('Location').get();
    let locationsData = []
    locations.forEach((doc) => {
      let tempLocation = { ID: doc.id, ...doc.data(),  }
      locationsData.push(tempLocation)
    })
    console.log(locationsData)
    return locationsData;
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getLocation = async (id) => {
  try {
    const location = await db.collection('Location').doc(id)
    console.log(location)
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
