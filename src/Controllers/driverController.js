const driverService = require('../Services/driverService')

const createDriver = (req,res) => {
    try {
       const createdDriver = driverService.createDriver()
        res.status(200).send({data: createdDriver})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};
const getDrivers = (req,res) => {
    try {
       const drivers = driverService.getDrivers()
        res.status(200).send({data: drivers})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getDriver = (req,res) => {
    try {
       const drivers = driverService.getDriver(req.params.id)
        res.status(200).send({data: drivers})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const updateDriver = (req,res) => {
    const body = req.body
    try {
       const updateDriver = driverService.updateDriver(body)
        res.status(200).send({data: updateDriver})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteDriver = (req,res) => {
    try {
       const deleteDriver = driverService.deleteDriver(req.params.id)
        res.status(200).send({data: deleteDriver})
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
