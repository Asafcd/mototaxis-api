const driverService = require('../Services/driverService')
const {validateBody, validateId} = require('../Validators/driverValidator')

const createDriver = async (req,res) => {
    const body = req.body
    const {status, error} = validateBody(body)
    if(status){
        try {
           const {data} = await driverService.createDriver(body)
            res.status(200).send({message: 'Driver successfully created', data})
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else{
        res.status(400).send({status: "Failed type validation", data: error})
    }
};
const getDrivers = async (req,res) => {
    try {
        
        const driversData = await driverService.getDrivers()
       
        res.status(200).send(driversData)
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getDriver = async (req,res) => {
    const {id} = req.params
    const {status, error} = validateId(id)
    if (status){
        try {
            const { status, data } = await driverService.getDriver(id)
            if(status) { res.status(200).send({data}) }
            else{
                res.status(400).send({data: `Driver with id ${id} not found`})
            }
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else {
        res.status(400).send({status: "Failed type validation", data: error })
    }
};

const updateDriver = async (req,res) => {
    const {id} = req.params
    const body = req.body
    try {
        const {data} = await driverService.updateDriver(id, body)
        res.status(200).send({data})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteDriver = async (req,res) => {
    const {id} = req.params
    try {
       const {status} = await driverService.getDriver(id)
       if(status){
        const {data} = await driverService.deleteDriver(id)
        res.status(200).send({data: deleteDriver})
        } else{
            res.status(400).send({data: 'Driver to delete not found'})
       }
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

module.exports ={
    createDriver,
    getDrivers,
    getDriver,
    updateDriver,
    deleteDriver,
}
