const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')

const driverSchema = require('../models/driver')

const createDriver = async (_driver) => {
  try {
    const driver = new driverSchema(_driver)
    console.log(driver)
    const newDriver = await driver.save()
    return { status: true, data: newDriver._id }

  } catch (error) { throw { status: 500, message: error?.message || error }; }
}

const getDrivers = async () => {
  try {
    return await driverSchema.find()
  } catch (err) { throw { status: 500, error: err } }
}


const getDriver = async (id) => {
  try {
    const driverRef = await driverSchema.findById(id)

    if (!driverRef) {
      return { status: false, data: "Driver does not exist" }
    }
    //console.log(driverRef)
    return { status: true, data: driverRef }

  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateDriver = async (id, body) => {
  try {
    //console.log("entrando a updated")
    await driverSchema.findByIdAndUpdate(id, body, { runValidators: true, returnOriginal: false })
    //console.log(updatedDriver)
    return { status: true, data: "Driver updated successfully" }
  } catch (error) { throw { status: error?.status || 500, message: error?.message || error } }

}

const deleteDriver = async (id) => {
  try {
    await driverSchema.findByIdAndRemove(id)
    return { status: true, data: "Driver deleted successfully" }
  } catch (error) { throw { status: error?.status || 500, message: error?.message || error } }

}


module.exports = {
  getDriver,
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
};