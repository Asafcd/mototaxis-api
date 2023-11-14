const buttonService = require('../Services/reportService')
const {validateBody, validateId} = require('../Validators/buttonValidator')

const createReport = async (req,res) => {
    const body = req.body
    const {status, error} = validateBody(body)
    if(status){
        try {
           const {data} = await buttonService.createReport(body)
            res.status(200).send({message: 'Button report successfully created', data})
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else{
        res.status(400).send({status: "Failed type validation", data: error})
    }
};
const getReports = async (req,res) => {
    try {
        const reportsData = []
        const {data} = await buttonService.getReports()
        data.forEach((report) => {
            const tempReport = {ID: report.id, ...report.data()}
            reportsData.push(tempReport);
        });
        res.status(200).send(reportsData)
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getReport = async (req,res) => {
    const {id} = req.params
    const {status, error} = validateId(id)
    if (status){
        try {
            const { status, data } = await buttonService.getReport()
            if(status) { res.status(200).send({data}) }
            else{
                res.status(400).send({data: `Button Report with id ${id} not found`})
            }
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else {
        res.status(400).send({status: "Failed type validation", data: error })
    }
};

const updateReport = async (req,res) => {
    const {id} = req.params
    const body = req.body
    try {
        const {data} = await buttonService.updateReport(id, body)
        res.status(200).send({data})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteReport = async (req,res) => {
    const {id} = req.params
    try {
       const {status} = await buttonService.getReport(id)
       if(status){
        const {data} = await buttonService.deleteReport(id)
        res.status(200).send({data: deleteReport})
        } else{
            res.status(400).send({data: 'Button report to delete not found'})
       }
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
