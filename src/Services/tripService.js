import firebase from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebase)

const createTrip = (body) =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

const getTrips = () =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

const getTrip = (id) =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

const updateTrip = (id, body) =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

const deleteTrip = (id) =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

//const trips [ ]

module.exports = {
    createTrip,
    getTrip,
    getTrips,
    updateTrip,
    deleteTrip
}