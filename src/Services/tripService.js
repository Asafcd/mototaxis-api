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

const createTrip = async (trip) => {
  try {
    const tripRef = await tripCollection.add({
      ...trip,
      date: Date.now(),
      status: "inProgress",
      paid: false,
    })
    const tripDoc = await tripRef.get()
    return { status: true, data: tripDoc.id }
  } catch (error) {
    console.log(error.message)
    throw { status: 500, error: error.message };
  }
};

const getTrips = async () => {
  try {
    const trips = await db.collection('viajes').get();

    return { status: true, data: trips.docs }
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getTrip = async (id) => {
  try {
    const tripRef = db.collection('viajes').doc(id)
    const trip = await tripRef.get()

    if (trip.exists) { return { status: true, data: trip.data() } }
    else { return { status: false, data: "No such document" } }

  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateTrip = async (id, body) => {
  try {
    const tripRef = db.collection('viajes').doc(id)
    await tripRef.update(body)
    const updatedTrip = await tripRef.get()
    return { status: true, data: updatedTrip.data() }
  } catch (error) {
    throw { status: error.status || 500, error: error };
  }
};

const deleteTrip = async (id) => {
  try {
    const tripRef = tripCollection.doc(id)
    if (tripRef.exists) {
      const tripDoc = await tripRef.delete()
    } else { throw { status: false, data: "No such trip document" } }
    return { status: true, data: tripDoc.data() }
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const changeStatus = async (id, status) => {
  try {
    const tripRef = db.collection('viajes').doc(id)
    await tripRef.update({ status: status })
    const updatedTrip = await tripRef.get()
    return { status: true, data: updatedTrip.data() }
  } catch (error) {
    throw { status: error.status || 500, error: error };
  }
}


const payTrip = async (id) => {
  try {
    const tripRef = db.collection('viajes').doc(id)
    await tripRef.update({ paid: true })
    const updatedTrip = await tripRef.get()
    return { status: true, data: updatedTrip.data() }
  } catch (error) {
    throw { status: error.status || 500, error: error };
  }
}

module.exports = {
  createTrip,
  getTrip,
  getTrips,
  updateTrip,
  deleteTrip,
  changeStatus,
  payTrip,
};