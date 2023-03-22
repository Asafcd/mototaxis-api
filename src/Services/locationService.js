const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const createLocation = async (ID, body) => {
  try {
    const res = await db.collection('Location').add(body)
    return res;
  } catch (error) {
    throw { status: 500, error};
  }
};

const getLocations = async() => {
  try {
    const locations = await db.collection('Location').get();
    return locations;
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getLocation = async (id) => {
  try {
    const locationRef = db.collection('Location').doc(id)
    const location = await locationRef.get()

    if(location.exists){ return location.data()}
    else{return "No such document"}
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateLocation = async(id, body) => {
  try {
    const locationRef = db.collection('Location').doc(id)
    await locationRef.update(body)
    const updatedLocation = await locationRef.get()
    return updatedLocation.data()
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const deleteLocation = async(id) => {
  try {
    const locationRef = db.collection('Location').doc(id)
    await locationRef.delete()

    return `${id} deleted succesfully`
    
  } catch (error) {
    throw { status: 500, error: error || 'Service method error' };
  }
};

module.exports = {
  createLocation,
  getLocation,
  getLocations,
  updateLocation,
  deleteLocation,
};
