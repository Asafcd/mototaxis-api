const PlaceSchema = require('../models/place')

const createData = async (data) => {
    try {
        const place = new PlaceSchema(data)
        const newplace = await place.save()
        return {status: true, data: newplace._id}
    } catch (err) { throw { status: 500, error: err } }
}

const getData = async () => {
    try {
        return await PlaceSchema.find()
    } catch (err) { throw { status: 500, error: err } }
}

const getDataById = async (id) => {
    try {
        const dataRef = await PlaceSchema.findById(id)
        if(!dataRef) { return { status: false, data: "place does not exist" } }

        return {status: true, data: dataRef}
    } catch (err) { throw { status: 500, error: err } }
}

const updateData = async (id, data) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "place does not exist" } }

        const dataRef = await PlaceSchema.findByIdAndUpdate(id, data)
        return {status: true, data: dataRef}
    }catch(err){throw {status: 500, error: err}}
}

const deleteData = async (id) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "place does not exist" } }

        const data = await PlaceSchema.findByIdAndRemove(id)
        return {status: true, data}
    }catch(err){throw {status: 500, error: err}}
}

module.exports = { createData, getData, getDataById, updateData, deleteData }