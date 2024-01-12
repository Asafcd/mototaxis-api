const UserSchema = require('../models/user')

const createData = async (data) => {
    try {
        const user = new UserSchema(data)
        const newuser = await user.save()
        return {status: true, data: newuser._id}
    } catch (err) { throw { status: 500, error: err } }
}

const getData = async () => {
    try {
        return await UserSchema.find()
    } catch (err) { throw { status: 500, error: err } }
}

const getDataById = async (id) => {
    try {
        const dataRef = await UserSchema.findById(id)
        if(!dataRef) { return { status: false, data: "user does not exist" } }

        return {status: true, data: dataRef}
    } catch (err) { throw { status: 500, error: err } }
}

const updateData = async (id, data) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "user does not exist" } }

        const dataRef = await UserSchema.findByIdAndUpdate(id, data)
        return {status: true, data: dataRef}
    }catch(err){throw {status: 500, error: err}}
}

const deleteData = async (id) => {
    try{
        const {status} = await getDataById(id)
        if(!status) { return { status: false, data: "user does not exist" } }

        const data = await UserSchema.findByIdAndDelete(id)
        return {status: true, data}
    }catch(err){throw {status: 500, error: err}}
}

module.exports = { createData, getData, getDataById, updateData, deleteData }