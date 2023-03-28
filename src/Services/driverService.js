const { getFirestore, Timestamp, FieldValue, GeoPoint } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const createDriver = async (body) => {
  try {
    const res = await db.collection('Drivers').add(body)
    return {status: true, data: res};
  } catch (error) {
    throw { status: 500, error};
  }
};

const getDrivers = async () => {
  try {
    const drivers = await db.collection('Drivers').get();
    return {status: true, data: drivers}
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getDriver = async (id) => {
  try {
    const driverRef = db.collection('Drivers').doc(id)
    const driver = await driverRef.get()

    if(driver.exists){ return {status:true, data: driver.data()}}
    else{return {status: false, data:"No such document"}}
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};s

const updateDriver = async(id, body) => {
  try {
    const driverRef = db.collection('Drivers').doc(id)
    await driverRef.update(body)
    const updatedDriver = await driverRef.get()
    return {status: true, data: updatedDriver.data()}
  } catch (error) {
    throw { status: error.status||500, error: error };
  }
};

const deleteDriver = async(id) => {
  try {
    const driverRef = db.collection('Drivers').doc(id)
    await driverRef.delete()

    return {status: true, data: `${id} deleted succesfully` }
    
  } catch (error) {
    throw { status: 500, error: error || 'Service method error' };
  }
};

module.exports = {
  createDriver,
  getDriver,
  getDrivers,
  updateDriver,
  deleteDriver,
};