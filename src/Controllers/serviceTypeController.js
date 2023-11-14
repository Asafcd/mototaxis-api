const { getData } = require("../Services/serviceTypeService")

const get = async (req, res) => {
  try {
    const data = await getData();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = { get }