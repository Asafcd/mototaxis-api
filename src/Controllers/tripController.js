const tripService = require('../Services/driverService')

const createTrip = (req,res) => {
    try {
       const createdTrip = tripService.createTrip()
        res.status(200).send({data: tripCreated})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getTrips = (req,res) => {
    try {
       const trips = tripService.getTrip()
        res.status(200).send({data: trips})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getTrip = (req,res) => {
    try {
       const trip = tripService.getTrip()
        res.status(200).send({data: trip})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const updateTrip = (req,res) => {
    try {
       const updatedTrip = tripService.updateTrip()
        res.status(200).send({data: updatedTrip})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteTrip = (req,res) => {
    try {
       const deletedTrip = tripService.deleteTrip()
        res.status(200).send({data: deletedTrip})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};


module.exports ={
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
}
