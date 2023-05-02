const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin')
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const login = async (body) => {
  try {
    const { email, password } = req.body;
    // admin.auth().signInWithEmailAndPassword(email, password)
    // .then((userCredential) => {
    //   console.log("successfull" + userCredential)
    // })
    // .catch((error) => {
    //   console.log("error" + error)
    // });
    return {status: true, data: res};
  } catch (error) {
    throw { status: 500, error};
  }
};

const changePassword = async(id, body) => {
  try {
    // const driverRef = db.collection('Drivers').doc(id)
    // await driverRef.update(body)
    // const updatedDriver = await driverRef.get()
    return {status: true, data: updatedDriver.data()}
  } catch (error) {
    throw { status: error.status||500, error: error };
  }
};

const logout = async() => {
  try {
    // const driverRef = db.collection('Drivers').doc(id)
    // await driverRef.delete()

    return {status: true, data: `${id} deleted succesfully` }
    
  } catch (error) {
    throw { status: 500, error: error || 'Service method error' };
  }
};

module.exports = {
  login,
  changePassword,
  logout,
};