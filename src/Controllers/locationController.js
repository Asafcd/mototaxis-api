const locationService = require('../Services/locationService')

const location = {
    ID: "pla",
    address: "calle 9 #331 arcos",
    coordinates: {
        latitud: "20.920236508496956",
        longitud: "89.66749090568848",
    },
    coordinates_delta: {
        latitud: "20.920236508496956",
        longitud: "89.66749090568848",
    },
    name: "papeleria los angelitos",
};

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
       const location = locationService.getlocation(id)
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
       const updatedlocation = locationService.updatelocation(id, body)
        res.status(200).send({data: updatedlocation})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteLocation = (req,res) => {
    const id = req.params.id
    try {
       const deletedlocation = locationService.deleteLocation()
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
