const locationService = require('../Services/locationService')
const {validateBody, validateId} = require('../Validators/locationValidator')

const createLocation = async (req, res) => {
    const body = req.body
    const {status, error} = validateBody(body)
    if(status){
        try {
            const {coordinates, coordinates_delta} = body
            const geoP = locationService.toGeoPoint(coordinates)
            const geoP_delta = locationService.toGeoPoint(coordinates_delta)
            const location = { ...body, coordinates: geoP, coordinates_delta: geoP_delta}
            const resCreated = await locationService.createLocation(location)
            res.status(200).send({message: 'Location succesfully created', data: resCreated})
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    }else{
        res.status(400).send({status: "Failed type validation", data: error })
    }
      
};

const getLocations = async(req,res) => {
    try {
        let locationsData = []
       const locations = await locationService.getLocations()
       locations.forEach((doc) => {
            let tempLocation = { ID: doc.id, ...doc.data(),  }
            locationsData.push(tempLocation)
        })
    
        res.status(200).send({data: locationsData})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getLocation = async (req,res) => {
    const {id} = req.params
    const {status, error} = validateId(id)
    if(status){
        try {
            const location = await locationService.getLocation(id)
            res.status(200).send({data: location})
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    }else{
        res.status(400).send({status: "Failed type validation", data: error })
    }
    
};

const updateLocation = async(req,res) => {
    const {id} = req.params
    const body = req.body
    try {
       const updatedlocation = await locationService.updateLocation(id, body)
        res.status(200).send({data: updatedlocation})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err.error.details } });
    }
};

const deleteLocation = async (req,res) => {
    const {id} = req.params
    try {
        /* const {data:{exists}} = await getLocation(id)
        if(!exists){ return 'no existe el doc a eliminar' } */
        //Revisar con el service si existe y si es asi, eliminarlo
        //Si no existe, mandar msj que el ide buscado no existe
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
