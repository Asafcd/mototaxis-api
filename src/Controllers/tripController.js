const tripService = require('../Services/tripService')
const {validateBody, validateId} = require('../Validators/driverValidator')

const createTrip = async (req, res) => {
    const body = req.body
    //const {status, error} = validateBody(body)
   // if(status){
        try {
            //const {coordinates, coordinates_delta} = body
            //const geoP = tripService.toGeoPoint(coordinates)
            //const geoP_delta = tripService.toGeoPoint(coordinates_delta)
            //const trip = { ...body, coordinates: geoP, coordinates_delta: geoP_delta}
            const trip = { ...body}
            const {data} = await tripService.createTrip(trip)
            res.status(200).send({message: 'trip succesfully created', data})
        } catch (err) {
            res
            .status(err?.status || 400)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    /* }else{
        res.status(400).send({status: "Failed type validation", data: error })
    } */
      
};

const getTrips = async(req,res) => {
    try {
        let tripsData = []
       const {status, data} = await tripService.getTrips()
       if (status){
           data.forEach((doc) => {
               console.log(doc.data())
                let temptrip = { ID: doc.id, ...doc.data(),  }
                tripsData.push(temptrip)
            })
            res.status(200).send(tripsData)
       } else{ res.status(400).send({data: 'no trips found'})}
    
    } catch (err) {
        res
        .status(err?.status || 400)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getTrip = async (req,res) => {
    const {id} = req.params
    const {status, error} = validateId(id)
    if(status){
        try {
            const {status, data} = await tripService.getTrip(id)
            if(status){ res.status(200).send({data}) }
            else{ res.status(400).send({data: `trip with id ${id} not found`})}
            
        } catch (err) {
            res
            .status(err?.status || 400)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    }else{ res.status(400).send({status: "Failed type validation", data: error }) }  
};

const updateTrip = async(req,res) => {
    const {id} = req.params
    const body = req.body
    try {
       const {data} = await tripService.updateTrip(id, body)
        res.status(200).send({data})
    } catch (err) {
        res
        .status(err?.status || 400)
        .send({ status: "FAILED", data: { error: err?.message || err.error.details } });
    }
};

const deleteTrip = async (req,res) => {
    const {id} = req.params
    try {
        const {status} = await tripService.getTrip(id)
        if(status){ 
            const {data} = await tripService.deleteTrip(id)
            res.status(200).send({data})
        }
        else{ res.status(400).send({data: 'trip to delete not found'})}
        
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};


module.exports ={
    createTrip,
    getTrip,
    getTrips,
    updateTrip,
    deleteTrip
}
