const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const clientService = require("../Services/clientService")


const login = async (req, res) => {
    const {correo, password} = req.body
    const { status, error } = validateEmail(correo)
    if (status) {
        try {
            const { status, data } = await clientService.getClientByEmail(correo)
            if (status) {
                const { status: validPw, error: pwError } = validatePassword(data.password, body.password)
                if (validPw) {
                    const token = jwt.sign({ _id: data.id }, "privateKey")
                    console.log("Token: ", token)
                    res.header('auth-token', token).send({ token: token, data: data })
                }
                else {
                    res.status(400).send({ status: "Failed", data: pwError })
                }
            }
            else {
                res.status(400).send({ status: "Failed", data: "Client not found" })
            }
        } catch (err) {
            res
                .status(err?.status || 500)
                .send({ status: "FAILED", data: { error: err.error || err } });
        }
    } else {
        res.status(400).send({ status: "Failed type validation", data: error })
    }
}

const validateToken = (req, res, next) => {
    // Obtenemos el token del header del request
    const token = req.header('auth-token')
    // Validamos si no hay token
    if(!token) return res.status(401).json({error: 'Acceso denegado'})
    try {
        // Verificamos el token usando la dependencia de jwt y el método .verify
        const verified = jwt.verify(token, "privateKey")
        // si el token es correcto nos devolvera los datos que pusimos en el token
        req.user = verified
        // next() indica que el req paso la prueba y continue su camino
        next()
    } catch (error){
        res.status(400).json({error: 'Token no valido, acceso denegado'})
    }
}

const validateEmail = (email) => {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !email){
        return { status:false, error:"Incorrect email"}
    }
    return { status:true , error:"none"}
}

const validatePassword = (hashedPassword, bodyReqPassword) =>{
    const validPw = bcrypt.compareSync(bodyReqPassword, userPassword)
    if(!validPw){
        return { status:false, error:"Incorrect password"}
    }
    return {status: true, error: "none"}
}

module.exports ={
    validateEmail,
    validatePassword,
    validateToken
}