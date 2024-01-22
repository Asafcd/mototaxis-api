const { createData, getData, getDataById, updateData, deleteData } = require("../Services/clientService")
const bycrypt = require('bcrypt')

const create = async (req, res) => {
  const body = req.body
  const saltRounds = 10;
  try {
    if(!body.password) return res.status(400).send({data: `Password is required`} )
    const encrypted = await bycrypt.hash(body.password, saltRounds)
    const user = { ...body, password: encrypted}
    const {data} = await createData(user);
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

const updatePassword = async (req, res) => {
  const { id } = req.params
  const body = req.body
  try {
      if( !body.password ) { return res.status(400).send({ data: `Password is required` }) }
      
      const { status } = await getDataById(id)
      if (!status) { return res.status(404).send({ data: `Driver with id ${id} not found` }) }
      
      const saltRounds = 10;
      const encrypted = await bycrypt.hash(body.password, saltRounds)
      const newBody = { ...body, password: encrypted }
      const { data } = await updateData(id, newBody)
      return res.status(200).send({ data: "Password updated succesfully" })
  } catch (err) {
      res
          .status(err?.status || 500)
          .send({ status: "FAILED", data: { error: err?.message || err } });
  }
};

const deleteById = async (req, res) => {
  const {id} = req.params
  try {
    const data = await deleteData(id);
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

module.exports = { create, get, getById, update, updatePassword, deleteById }