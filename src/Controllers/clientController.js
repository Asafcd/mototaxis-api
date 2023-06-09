const {getClientbyId} = require("../Services/clientService")

const getClient = async (req, res) => {
    const {id} = req.params
    try {
        const {status, data} = await getClientbyId(id)
        if(status) { res.status(200).send({data}) }
        else{
            res.status(400).send({data: `Client with id ${id} not found`})
        }
        console.log(data)
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
    
}

module.exports = {
    getClient
}