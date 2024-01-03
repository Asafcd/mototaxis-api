const TravelSchema = require('../models/travel')

const createData = async (data) => {
    try {
        const travel = new TravelSchema(data)
        const newtravel = await travel.save()
        return {status: true, data: newtravel._id}
    } catch (err) { throw { status: 500, error: err } }
}

const getData = async () => {
    try {
        return await TravelSchema.find()
    } catch (err) { throw { status: 500, error: err } }
}

const getDataById = async (id) => {
    try {
        const dataRef = await TravelSchema.findById(id)
        if(!dataRef) { return { status: false, data: "Travel does not exist" } }

        return {status: true, data: dataRef}
    } catch (err) { throw { status: 500, error: err } }
}

const updateData = async (id, data) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "Travel does not exist" } }

        const dataRef = await TravelSchema.findByIdAndUpdate(id, data)
        return {status: true, data: dataRef}
    }catch(err){throw {status: 500, error: err}}
}

const deleteData = async (id) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "Travel does not exist" } }

        const data = await TravelSchema.findByIdAndDelete(id)
        return {status: true, data}
    }catch(err){throw {status: 500, error: err}}
}

module.exports = { createData, getData, getDataById, updateData, deleteData }