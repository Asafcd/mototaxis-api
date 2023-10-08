const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const feeCollection = db.collection('pagos')

const createFee = async (fee) => {
  try {
    const feeRef = await feeCollection.add({...fee,})
    const feeDoc = await feeRef.get()
    return {status: true, data: feeDoc.id()}
  } catch (error) {
      throw { status: 500, error: error };
  }
};

const getFees = async () => {
  try {
    const fees = await db.collection('pagos').get()
    //console.log(fees.docs)
    return {status: true, data: fees.docs}
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const getFee = async (id) => {
  try {
    const feeRef = db.collection('pagos').doc(id)
    const fee = await feeRef.get()

    if(fee.exists) { 
      return {status:true, data: fee.data()}
    }
    else {
      return {status: false, data:"Fee does not exist"}
    }
    
  } catch (error) {
    throw { status: 500, error: error };
  }
};

const updateFee = async(id, body) => {
  try {
    const feeRef = db.collection('pagos').doc(id)
    await feeRef.update(body)
    const updatedFee = await feeRef.get()
    return {status: true, data: updatedFee.data()}
  } catch (error) {
    throw { status: error.status||500, error: error };
  }
};

const deleteFee = async(id) => {
  try{
    const feeRef = feeCollection.doc(id)
    if(feeRef.exists){
        const feeDoc = await feeRef.delete()
    } else {throw {status: false, data: "No such fee document"}}
    return {status: true, data: feeDoc.data()}
  } catch (error) {
      throw { status: 500, error: error };
  }
};

module.exports = {
  getFee,
  getFees,
  createFee,
  updateFee,
  deleteFee,
};