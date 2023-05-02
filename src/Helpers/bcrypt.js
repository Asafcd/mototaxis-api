const bcrypt = require('bcrypt')

const encrypt = async ( password ) => {
    const salt = bcrypt.genSaltSync(12)
    const hash = await bcrypt.hash(password, salt)

    return hash //Return the hashed string
}

const decrypt = async (inputPassword, userPassword) => {
    const isValid = await bcrypt.compare(inputPassword, userPassword)

    return isValid //Return a Boolean after comparisson
}

module.exports = {
    encrypt,
    decrypt
}