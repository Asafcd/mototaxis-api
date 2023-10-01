const { getFirestore, GeoPoint } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

// const placeInfo = {
//   placeId: "",
//   title: "",
//   structured_formatting: {
//   main_text: "",
//   secondary_text: "",
//   },
//   latitude: Number,
//   longitude: Number,
// };

const createLocation = async (location) => {
  try {
    const res = await db.collection('Location').add(location)
    return {status: true, data: res};
  } catch (error) {
    throw { status: 500, error};
  }
};

const getLocations = async() => {
  try {
    const locations = await db.collection('Location').get();
    return {status: true, data: locations}
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getLocation = async (id) => {
  try {
    const locationRef = db.collection('Location').doc(id)
    const location = await locationRef.get()

    if(location.exists){ return {status:true, data: location.data()}}
    else{return {status: false, data:"No such document"}}
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateLocation = async(id, location) => {
  try {
    const locationRef = db.collection('Location').doc(id)
    await locationRef.update(location)
    const updatedLocation = await locationRef.get()
    return {status: true, data: updatedLocation.data()}
  } catch (error) {
    throw { status: error.status || 500, error: error };
  }
};

const deleteLocation = async(id) => {
  try {
    const locationRef = db.collection('Location').doc(id)
    await locationRef.delete()

    return {status: true, data: `Location deleted succesfully` }
    
  } catch (error) {
    throw { status: 500, error: error || 'Service method error' };
  }
};

const toGeoPoint = (coordinates) => {
  const {latitud, longitud} = coordinates
  return new GeoPoint(latitud, longitud)
}

module.exports = {
  toGeoPoint,
  createLocation,
  getLocation,
  getLocations,
  updateLocation,
  deleteLocation,
};
