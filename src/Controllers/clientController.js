const clientService = require("../Services/clientService")
const tripService = require("../Services/tripService")
const { check, validationResult } = require("express-validator")

const createClient = async (req, res) => {
    const body = req.body
    //const {status, error} = validateBody(body)
    //console.log(body)
    // if(status){
    try {
        const { status, data } = await clientService.createClient(body, 'https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png')

        status ? res.status(200).send({ message: 'Client successfully created! ID: ', data }) : res.status(400).send({ message: 'Client could not be created', data })

    } catch (err) {
        console.log(err)
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err.error || err } });
    }
    /* } else{
        res.status(400).send({status: "Failed type validation", data: error})
    } */
};

const getClient = async (req, res) => {
    const { id } = req.params
    try {
        const { status, data } = await clientService.getClient(id)
        if (status) {
            const { data: tripData } = await clientService.getTripByClient(id)
            const clientData = { historial: tripData, ...data }
            res.status(200).send({ clientData })
        }
        else {
            res.status(400).send({ data: `Client with id ${id} not found` })
        }

    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

const getClients = async (req, res) => {
    try {
        const { status, data } = await clientService.getClients()
        const clientData = []
        data.forEach((doc) => {
            let tempClient = { ID: doc.id, ...doc.data() }
            clientData.push(tempClient)
        })

        status ? res.status(200).send({ clientData }) : res.status(500).send({ data })
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

const updateClient = async (req, res) => {
    const body = req.body
    const { id } = req.params
    const { status, error } = validateBody(body)
    if (status) {
        try {
            const { status, data } = await clientService.updateClient(body, id)
            status ? res.status(200).send({ data }) : res.status(400).send({ data })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else {
        res.status(400).send({ status: "Failed type validation", data: error })
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.params
    try {
        const { status, data } = await clientService.deleteClient(id)
        status ? res.status(200).send({ data }) : res.status(400).send({ data })
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