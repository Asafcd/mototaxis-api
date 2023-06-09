const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const clientCollection = db.collection('clientes')

const getClientbyId = async(id) => {
    try{
        const clientRef = clientCollection.doc(id)
        const clientDoc = await clientRef.get()

        if(client.exists){ return {status:true, data: clientDoc.data()} }
        else { return {status: false, data:"No such document"} }
        
    } catch (error) {
        throw { status: 500, error: error };
  }
}

module.exports = {
    getClientbyId
}