// Cliente asociado (referencia al cliente que solicitó el viaje)
// Conductor asociado (referencia al conductor que aceptó el viaje)
// Dirección de recogida
// Dirección de destino
// ID de la ubicación de recogida (Obtenida desde la API de Ubicaciones)
// ID de la ubicación de destino (Obtenida desde la API de Ubicaciones)
// Estado del viaje (por ejemplo, "solicitado", "aceptado", "en curso", “completado”, "completado", etc.)
// Hora de inicio
// Hora de finalización del viaje
// Tarifa del viaje


const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const tripCollection = db.collection('viajes')
const feeCollection = db.collection('pagos')

const createtrip = async (trip) => {
  try {
    const tripRef = await tripCollection.add({...trip})
    const tripDoc = await tripRef.get()
    return {status: true, data: tripDoc.id()}
  } catch (error) {
      throw { status: 500, error: error };
  }
};

const getDrivers = async () => {
  try {
    const drivers = await db.collection('operadores').get();
    return {status: true, data: drivers}
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getDriver = async (id) => {
  try {
    const driverRef = db.collection('operadores').doc(id)
    const driver = await driverRef.get()

    if(driver.exists){ return {status:true, data: driver.data()}}
    else{return {status: false, data:"No such document"}}
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateDriver = async(id, body) => {
  try {
    const driverRef = db.collection('operadores').doc(id)
    await driverRef.update(body)
    const updatedDriver = await driverRef.get()
    return {status: true, data: updatedDriver.data()}
  } catch (error) {
    throw { status: error.status||500, error: error };
  }
};

const deleteDriver = async(id) => {
  try{
    const driverRef = driverCollection.doc(id)
    if(driverRef.exists){
        const driverDoc = await driverRef.delete()
    } else {throw {status: false, data: "No such driver document"}}
    return {status: true, data: driverDoc.data()}
  } catch (error) {
      throw { status: 500, error: error };
  }
};

const addTripToDriver = async (trip, rating) => {
  try {
      const driverRef = driverCollection.doc(trip.driver)
      const driverData = (await driverRef.get()).data()
      driverData.historial.push(trip.id)
      driverData.rating.push(rating)
      await driverRef.update(driverData)
      return {status: true, data: driverData}
  } catch (error) {
      throw { status: 500, error: error };
  }
}

const driverOnline = async (id) => {
  try {
    const driverRef = driverCollection.doc(trip.driver)
    const driverData = (await driverRef.get()).data()
    driverData.disponibilidad = true
    await driverRef.update(driverData)
  } catch (error) {
    throw { status: 500, error: error };
  }
}

module.exports = {
  createDriver,
  getDriver,
  getDrivers,
  updateDriver,
  deleteDriver,
  addTripToDriver,
  driverOnline,
};