const driverService = require('../Services/driverService')

const getAllDrivers = (req,res) => {
    try {
       const drivers = driverService.getAlldrivers()
        res.status(200).send({data: drivers})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

module.exports ={
    getAllDrivers
}
