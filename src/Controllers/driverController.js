const { uploadImageDriver } = require('../Configs/cloudinaryConfig');
const driverService = require('../Services/driverService')
const { validateBody, validateId } = require('../Validators/driverValidator')

const createDriver = async (req, res) => {
    const body = req.body
    let file
    req.file ? file = req.file : file = undefined

    try {
        if(file!==undefined){
            const { public_id, url } = await uploadImageDriver(file)
            const driver = { 
                ...body,
                profile_picture: { url, public_id }
            }
            const { data } = await driverService.createDriver(driver)
            res.status(200).send({ message: 'Driver successfully created, id: ', data })

        }
        const driver = { 
            ...body,
            profile_picture: { url: "", public_id: "" }
        }
        const { data } = await driverService.createDriver(driver)
        res.status(200).send({ message: 'Driver successfully created without picture, id: ', data })

    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: err?.message || err });
    }

};
const getDrivers = async (req, res) => {
    try {
        const driversData = await driverService.getDrivers()
        res.status(200).send({ data: driversData })
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const getDriver = async (req, res) => {
    const { id } = req.params
    const { status, error } = validateId(id)
    if (status) {
        try {
            const { status, data } = await driverService.getDriver(id)
            if (!status) { res.status(400).send({ data: `Driver with id ${id} not found` }) }
            res.status(200).send({ data })
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else {
        res.status(400).send({ status: "Failed type validation", data: error })
    }
};

const updateDriver = async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const { status } = await driverService.getDriver(id)
        if (!status) { res.status(404).send({ data: `Driver with id ${id} not found` }) }

        const { data } = await driverService.updateDriver(id, body)
        res.status(200).send({ data })
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const deleteDriver = async (req, res) => {
    const { id } = req.params
    try {
        const { status } = await driverService.getDriver(id)
        if (!status) {
            res.status(404).send({ data: `Driver with id ${id} not found` })
            return;
        }
        const { data } = await driverService.deleteDriver(id)
        res.status(200).send({ data })
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

module.exports = {
    createDriver,
    getDrivers,
    getDriver,
    updateDriver,
    deleteDriver,
}
