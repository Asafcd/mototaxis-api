const clientService = require("../Services/clientService")
const tripService = require("../Services/tripService")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("../Configs/bucketConfig");
const BUCKET_NAME='mototaxi-bucket'
const bcrypt = require('bcrypt');

const createClient = async (req, res) => {
    const body = req.body
    const profilePic = req.file
    //const {status, error} = validateBody(body)
    //console.log(body)
    // if(status){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const fileName = profilePic.originalname
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: imagen.buffer,
            ContentType: imagen.mimetype,
        }
        const command = new PutObjectCommand(params)
        const bucket = await s3.send(command)
        console.log(bucket)
        const client = { ...body, password: hashedPassword }
        const { status, data } = await clientService.createClient(client, fileName)
        const token = jwt.sign({ _id: data.id }, "privateKey")

        status ? res
        .header('auth-token', token)
        .status(200)
        .send({ message: 'Client successfully created! ID: ', data, token }) : res.status(400).send({ message: 'Client could not be created', data })
        
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
            const getObjectParams ={
                Bucket: BUCKET,
                Key: data.profilePic
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            const client = { ...data, profilePic: url }
            const clientData = { historial: tripData, ...client }
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
    //const { status, error } = validateBody(body)
    //if (status) {
        try {
            const { status, data } = await clientService.updateClient(body, id)
            status ? res.status(200).send({ message: `Cliente ${id} actualizado: `, data }) : res.status(400).send({ data })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    /* } else {
        res.status(400).send({ status: "Failed type validation", data: error })
    } */
}

const deleteClient = async (req, res) => {
    const { id } = req.params
    console.log(id)
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