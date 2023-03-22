const locationService = require('../Services/locationService')

const createLocation = async (req, res) => {
    const ID = req.params.id
    const body = req.body
     
    try {
       const resCreated = await locationService.createLocation(ID,body)
        res.status(200).send({data: resCreated})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getLocations = async(req,res) => {
    try {
       const locations = await locationService.getLocations()
        res.status(200).send({data: locations})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getLocation = async (req,res) => {
    const id = req.params.id
    try {
       const location = await locationService.getLocation(id)
        res.status(200).send({data: location})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const updateLocation = async(req,res) => {
    const id = req.params.id
    const body = req.body
    try {
       const updatedlocation = locationService.updateLocation(id, body)
        res.status(200).send({data: updatedlocation})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteLocation = async (req,res) => {
    const id = req.params.id
    try {
       const deletedlocation = await locationService.deleteLocation(id)
        res.status(200).send({data: deletedlocation})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};


module.exports ={
    createLocation,
    getLocations,
    getLocation,
    updateLocation,
    deleteLocation
}
