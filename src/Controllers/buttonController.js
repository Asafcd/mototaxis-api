const buttonService = require('../Services/buttonService')

const createReport = (req,res) => {
    try {
       const createdReport = buttonService.createReport()
        res.status(200).send({data: createdReport})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getReports = (req,res) => {
    try {
       const reports = buttonService.getReports()
        res.status(200).send({data: reports})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getReport = (req,res) => {
    try {
       const reports = buttonService.getReport(req.params.id)
        res.status(200).send({data: reports})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const updateReport = (req,res) => {
    const body = req.body
    try {
       const updateReport = buttonService.updateReport(body)
        res.status(200).send({data: updateReport})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteReport = (req,res) => {
    try {
       const deleteReport = buttonService.deleteReport(req.params.id)
        res.status(200).send({data: deleteReport})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

module.exports ={
    createReport,
    getReports,
    getReport,
    updateReport,
    deleteReport,
}