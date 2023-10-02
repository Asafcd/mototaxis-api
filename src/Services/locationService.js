const { getFirestore, GeoPoint } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const createLocation = async (body) => {
  try {
    const res = await db.collection('viajes').add(body)
    return {status: true, data: res};
  } catch (error) {
    throw { status: 500, error};
  }
};

const getLocations = async() => {
  try {
    const locations = await db.collection('viajes').get();
    return {status: true, data: locations}
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getLocation = async (id) => {
  try {
    const locationRef = db.collection('viajes').doc(id)
    const location = await locationRef.get()

    if(location.exists){ return {status:true, data: location.data()}}
    else{return {status: false, data:"No such document"}}
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateLocation = async(id, body) => {
  try {
    const locationRef = db.collection('viajes').doc(id)
    await locationRef.update(body)
    const updatedLocation = await locationRef.get()
    return {status: true, data: updatedLocation.data()}
  } catch (error) {
    throw { status: error.status||500, error: error };
  }
};

const deleteLocation = async(id) => {
  try {
    const locationRef = db.collection('viajes').doc(id)
    await locationRef.delete()

    return {status: true, data: `${id} deleted succesfully` }
    
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
