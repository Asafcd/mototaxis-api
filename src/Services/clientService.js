const { getFirestore } = require('firebase-admin/firestore');
const firebase = require('../../firebase')
const db = getFirestore(firebase)

const clientCollection = db.collection('clientes')
const tripsCollection = db.collection('viajes')
const feeCollection = db.collection('pagos')

const getClientbyId = async (id) => {
    try{
        const clientRef = clientCollection.doc(id)
        const clientDoc = await clientRef.get()
        
        if(clientDoc.exists){ return {status:true, data: clientDoc.data()} }
        else { return {status: false, data:"No such Client document"} }
        
    } catch (error) {
        throw { status: 500, error: error };
  }
}

 const getTrips = async (idRefs) => {
    try {
        const tripsRef = await tripsCollection.get()
        const tripsDocs = tripsRef.docs
        const trips = []
        idRefs.forEach( (id) => {
            const trip = tripsDocs.find( (doc) =>  doc.id == id)
            const tripData = trip.data()
            const feeId = trip.get("fee")._path.segments[1]
            trips.push(tripData)
            tripData.fee.get().then(documentSnapshot => {
                if (documentSnapshot.exists) {
                  console.log(documentSnapshot);
                }
        })
        })
        //trips.find((trip) => trip)
        
        return {status: true, data: trips}
    } catch (error) {
        throw { status: 500, error: error };
    }
 }

 const getFee = async (idFee) => {
    try {
        const feeRef = feeCollection.doc(idFee)
        const feeDoc = await feeRef.get()
    
        if(feeData.exists){ return {status:true, data: feeDoc.data()} }
        else { return {status: false, data:"No such Fee document"} }
        
    } catch (error) {
        throw { status: 500, error: error };
    }
 }

 const createClient = async (client, profilePic) => {
    try {
        const clientRef = await clientCollection.add({...client,
            historial: [],
            rating: [5],
            profilePic: profilePic,})
        const clientDoc = await clientRef.get()
        return {status: true, data: clientDoc.id()}
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

 const addTripToClient = async (trip, rating) => {
    try {
        const clientRef = clientCollection.doc(trip.client)
        const clientData = (await clientRef.get()).data()
        clientData.historial.push(trip.id)
        clientData.rating.push(rating)
        await clientRef.update(clientData)
        return {status: true, data: clientData}
    } catch (error) {
        throw { status: 500, error: error };
    }
 }

 const deleteClient = async (id) => {
    try{
        const clientRef = clientCollection.doc(id)
        if(clientRef.exists){
            const clientDoc = await clientRef.delete()
        } else {throw {status: false, data: "No such Client document"}}
        return {status: true, data: clientDoc.data()}
    } catch (error) {
        throw { status: 500, error: error };
    }
}

// TODO Change to picture, add the picture to the bucket

module.exports = {
    getClientbyId,
    getTrips,
    createClient,
    updateClient,
    addTripToClient,
    deleteClient
}