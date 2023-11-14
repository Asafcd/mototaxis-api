const { find } = require('../models/typeService')

const getData = async () => { 
    try {
        return await find()
    } catch (err) { throw { status: 500, error: err } }    
}

module.exports = { getData }