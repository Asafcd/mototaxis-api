const reportDriverSchema = require("../models/reportDriver");

const createData = async (data) => {
    try {
        const reportDriver = new reportDriverSchema(data)
        const newreportDriver = await reportDriver.save()
        return {status: true, data: newreportDriver._id}
    } catch (err) { throw { status: 500, error: err } }
}

const getData = async () => {
    try {
        return await reportDriverSchema.find()
    } catch (err) { throw { status: 500, error: err } }
}

const getDataById = async (id) => {
    try {
        const dataRef = await reportDriverSchema.findById(id)
        if(!dataRef) { return { status: false, data: "reportDriver does not exist" } }

        return {status: true, data: dataRef}
    } catch (err) { throw { status: 500, error: err } }
}

const updateData = async (id, data) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "reportDriver does not exist" } }

        const dataRef = await reportDriverSchema.findByIdAndUpdate(id, data)
        return {status: true, data: dataRef}
    }catch(err){throw {status: 500, error: err}}
}

const deleteData = async (id) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "reportDriver does not exist" } }

        const data = await reportDriverSchema.findByIdAndDelete(id)
        return {status: true, data}
    }catch(err){throw {status: 500, error: err}}
}

module.exports = { createData, getData, getDataById, updateData, deleteData }