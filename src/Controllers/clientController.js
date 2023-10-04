const clientService = require("../Services/clientService")
const tripService = require("../Services/tripService")
const {check, validationResult} = require("express-validator")

const createClient = async (req,res) => {
    const body = req.body
    const {status, error} = validateBody(body)
    if(status){
        try {
           const {status, data} = await clientService.createClient(body, 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png')

           status? res.status(200).send({message: 'Client successfully created! ID: ', data}) : res.status(400).send({message: 'Client could not be created', data})
                
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else{
        res.status(400).send({status: "Failed type validation", data: error})
    }
};

const getClient = async (req, res) => {
    const {id} = req.params
    try {
        const {status, data} = await clientService.getClient(id)
        if(status) { 
            const { data: tripData} = await tripService.getTripByClient(id)
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

const getClients = async(req, res) => {
    try {
        const {status, data} = await clientService.getClients()
        status? res.status(200).send({data}) : res.status(400).send({data})
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

const updateClient = async (req, res) => {
    const body = req.body
    const {id} = req.params
    const {status, error} = validateBody(body)
    if(status){
        try {
            const {status, data} = await clientService.updateClient(body, id)
            status? res.status(200).send({data}) : res.status(400).send({data})
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else{
        res.status(400).send({status: "Failed type validation", data: error})
    }
}

const deleteClient = async(req, res) => {
    const {id} = req.params
    try {
        const {status, data} = await clientService.deleteClient(id)
        status? res.status(200).send({data}) : res.status(400).send({data})
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

module.exports = {
    createClient,
    getClient,
    getClients,
    updateClient,
    deleteClient
}