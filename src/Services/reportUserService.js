const reportUserSchema = require("../models/reportUser");

const createData = async (data) => {
    try {
        const reportUser = new reportUserSchema(data)
        const newreportUser = await reportUser.save()
        return {status: true, data: newreportUser._id}
    } catch (err) { throw { status: 500, error: err } }
}

const getData = async () => {
    try {
        return await reportUserSchema.find()
    } catch (err) { throw { status: 500, error: err } }
}

const getDataById = async (id) => {
    try {
        const dataRef = await reportUserSchema.findById(id)
        if(!dataRef) { return { status: false, data: "reportUser does not exist" } }

        return {status: true, data: dataRef}
    } catch (err) { throw { status: 500, error: err } }
}

const updateData = async (id, data) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "reportUser does not exist" } }

        const dataRef = await reportUserSchema.findByIdAndUpdate(id, data)
        return {status: true, data: dataRef}
    }catch(err){throw {status: 500, error: err}}
}

const deleteData = async (id) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "reportUser does not exist" } }

        const data = await reportUserSchema.findByIdAndDelete(id)
        return {status: true, data}
    }catch(err){throw {status: 500, error: err}}
}

module.exports = { createData, getData, getDataById, updateData, deleteData }