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
            const {data} = await locationService.createLocation(location)
            res.status(200).send({message: 'Location succesfully created', data})
        } catch (err) {
            res
            .status(err?.status || 400)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    }else{
        res.status(400).send({status: "Failed type validation", data: error })
    }
      
};

const getLocations = async(req,res) => {
    try {
        let locationsData = []
       const {data} = await locationService.getLocations()
       data.forEach((doc) => {
            let tempLocation = { ID: doc.id, ...doc.data(),  }
            locationsData.push(tempLocation)
        })
    
        res.status(200).send({data: locationsData})
    } catch (err) {
        res
        .status(err?.status || 400)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getLocation = async (req,res) => {
    const {id} = req.params
    const {status, error} = validateId(id)
    if(status){
        try {
            const {status, data} = await locationService.getLocation(id)
            if(status){ res.status(200).send({data}) }
            else{ res.status(400).send({data: `location with id ${id} not found`})}
            
        } catch (err) {
            res
            .status(err?.status || 400)
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
       const {data} = await locationService.updateLocation(id, body)
        res.status(200).send({data})
    } catch (err) {
        res
        .status(err?.status || 400)
        .send({ status: "FAILED", data: { error: err?.message || err.error.details } });
    }
};

const deleteLocation = async (req,res) => {
    const {id} = req.params
    try {
        const {status} = await locationService.getLocation(id)
        if(status){ 
            const {data} = await locationService.deleteLocation(id)
            res.status(200).send({data})
        }
        else{ res.status(400).send({data: 'location to delete not found'})}
        
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
