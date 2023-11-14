const { createData, getData, getDataById, updateData, deleteData } = require("../Services/tripService")

const create = async (req, res) => {
  const body = req.body
  try {
    const {data} = await createData(body);
    res.status(201).send({ data, message: "Trip created succesfully" });
  } catch (err) {
    console.error(err)
    res.status(500).send({ err });
  }
}

const get = async (req, res) => {
  try {
    const data = await getData();
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

const getById = async (req, res) => {
  const {id} = req.params
  try {
    const data = await getDataById(id);
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

const update = async (req, res) => {
  const {id} = req.params
  const body = req.body
  try {
    const data = await updateData(id, body);
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

const deleteById = async (req, res) => {
  const {id} = req.params
  try {
    const data = await deleteData(id);
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

module.exports = { create, get, getById, update, deleteById }