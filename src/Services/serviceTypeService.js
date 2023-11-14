const TravelTypeSchema = require('../models/travelType')

const createTravelType = async (data) => {
    try {
        const travelType = new TravelTypeSchema(data)
        const newTravelType = await travelType.save()
        return {status: true, data: newTravelType._id}
    } catch (err) { throw { status: 500, error: err } }
}

const getData = async () => {
    try {
        return await TravelTypeSchema.find()
    } catch (err) { throw { status: 500, error: err } }
}

const getDataById = async (id) => {
    try {
        const dataRef = await TravelTypeSchema.findById(id)
        if(!dataRef) { return { status: false, data: "Travel type does not exist" } }

        return {status: true, data: dataRef}
    } catch (err) { throw { status: 500, error: err } }
}

const updateTravelType = async (id, data) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "Travel type does not exist" } }

        const dataRef = await TravelTypeSchema.findByIdAndUpdate(id, data)
        return {status: true, data: dataRef}
    }catch(err){throw {status: 500, error: err}}
}

const deleteTravelType = async (id) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "Travel type does not exist" } }

        const data = await TravelTypeSchema.findByIdAndRemove(id)
        return {status: true, data}
    }catch(err){throw {status: 500, error: err}}
}

module.exports = { createTravelType, getData, getDataById, updateTravelType, deleteTravelType }