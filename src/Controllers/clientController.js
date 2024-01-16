const { createData, getData, getDataById, updateData, deleteData } = require("../Services/clientService")

const create = async (req, res) => {
  const body = req.body
  try {
    const {data} = await createData(body);
    return res.status(201).send({ data, message: "User created succesfully" });
  } catch (err) {
    console.error(err)
    return res.status(500).send({ err });
  }
}

const get = async (req, res) => {
  try {
    const data = await getData();
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

const getById = async (req, res) => {
  const {id} = req.params
  try {
    const data = await getDataById(id);
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

const update = async (req, res) => {
  const {id} = req.params
  const body = req.body
  try {
    const data = await updateData(id, body);
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

const deleteById = async (req, res) => {
  const {id} = req.params
  try {
    const data = await deleteData(id);
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

module.exports = { create, get, getById, update, deleteById }