const feeService = require('../Services/feeService');

const createFee = async (req, res) => {
    const body = req.body;
    //const { status, error } = validateBody(body);
    //if (status) {
    try {
        const { status, data } = await feeService.createFee(body);
        status ? res.status(200).send({ data }) : res.status(400).send({ data });
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
    /* } else {
        res.status(400).send({ status: "Failed type validation", data: error });
    } */
}

const getFees = async (req, res) => {
    try {
        const { status, data } = await feeService.getFees();
        status ? res.status(200).send({ data }) : res.status(400).send({ data });
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

const getFee = async (req, res) => {
    const { id } = req.params;
    try {
        const { status, data } = await feeService.getFee(id);
        status ? res.status(200).send({ data }) : res.status(400).send({ data });
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

const updateFee = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    //const { status, error } = validateBody(body);
    //if (status) {
    try {
        const { status, data } = await feeService.updateFee(id, body);
        status ? res.status(200).send({ data }) : res.status(400).send({ data });
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
    /* } else {
        res.status(400).send({ status: "Failed type validation", data: error });
    } */
}

const deleteFee = async (req, res) => {
    const { id } = req.params;
    try {
        const { status, data } = await feeService.deleteFee(id);
        status ? res.status(200).send({ data }) : res.status(400).send({ data });
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
}

module.exports = {
    createFee,
    getFee,
    getFees,
    updateFee,
    deleteFee
}