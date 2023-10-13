const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const clientCollection = db.collection('clientes')
const tripsCollection = db.collection('viajes')
const feeCollection = db.collection('pagos')

const getClients = async () => {
    try {
      const clients = await db.collection('clientes').get();
      return {status: true, data: clients.docs}
    } catch (error) {
      throw { status: 500, error: error };
    }
  };
  
  const getClient = async (id) => {
    try {
      const clientRef = db.collection('clientes').doc(id)
      const client = await clientRef.get()
  
      if(client.exists) {
        return {status:true, data: client.data()}
    }
      else {
        return {status: false, data:"Client does not exist"}
    }  
    } catch (error) {
      throw { status: 500, error: error };
    }
  };

  const getClientByEmail = async (email) => {
    try {
      const clientRef = db.collection('clientes').where("correo" , "==", email)
      const client = await clientRef.get()
      const clientData = {...client.data(), id: client.id}
  
      if(client.exists) {
        return {status:true, data: clientData}
    }
      else {
        return {status: false, data:"Client does not exist"}
    }  
    } catch (error) {
      throw { status: 500, error: error };
    }
  };

 const createClient = async (client, profilePic) => {
    try {
        const clientRef = await clientCollection.add({...client,
            historial: [],
            profilePic: profilePic,})
        const clientDoc = await clientRef.get()
        const clientData = {...clientDoc.data(), id: clientDoc.id}
        return {status: true, data: clientData}
    } catch (error) {
        throw { status: 500, error: error };
    }
 }

 const updateClient = async (client, id) => {
    try{
        const clientRef = clientCollection.doc(id)
        const clientDoc = await clientRef.get()
        
        if(clientDoc.exists){ 
            await clientRef.update(client)
            return {status:true, data: clientDoc.data()} 
        }
        else { return {status: false, data:"No such Client document"} }
        
    } catch (error) {
        throw { status: 500, error: error };
    }
 }

 const addTripToClient = async (trip) => {
    try {
        const clientRef = clientCollection.doc(trip.userId)
        const clientData = (await clientRef.get()).data()
        clientData.historial.push(trip.travelId)
        await clientRef.update(clientData)
        return {status: true, data: clientData}
    } catch (error) {
        throw { status: 500, error: error };
    }
 }

 const deleteClient = async (id) => {
    try{
        const clientDoc = clientCollection.doc(id)
        const clientRef = await clientDoc.get()
        if(clientRef.exists){
            console.log(clientRef)
            await clientDoc.delete()
            return {status: true, data: "Succesfully deleted"}
        } else {throw {status: false, data: "No such Client document"}}
    } catch (error) {
        throw { status: 500, error: error };
    }
}

const getTripByClient = async (id) => {
    try{
        const clientRef = clientCollection.doc(id)
        const clientData = (await clientRef.get()).data()
        const trips = clientData.historial
        return {status: true, data: trips};
    } catch (error) {
        throw { status: 500, error: error };
    }
}

// TODO Change to picture, add the picture to the bucket
module.exports = {
    getClient,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    addTripToClient,
    getTripByClient,
    getClientByEmail
}