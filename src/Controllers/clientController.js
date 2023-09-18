const {getClientbyId, getTrips} = require("../Services/clientService")

const getClient = async (req, res) => {
    const {id} = req.params
    try {
        const {status, data} = await getClientbyId(id)
        if(status) { 
            const { data: tripData} = await getTrips(data.historial)
            const clientData = { ...data, historial: tripData}
            res.status(200).send({clientData}) 
        }
        else{
            res.status(400).send({data: `Client with id ${id} not found`})
        }
        
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
    
}

module.exports = {
    getClient
}