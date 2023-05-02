const authService = require('../Services/authService')

const login = async (req,res) => {
    const body = req.body
    // const {status, error} = validateBody(body)
    const status = true;
    if(status){
        try {
           const {data} = await authService.login(body)
            res.status(200).send({message: 'Login successful', data})
        } catch (err) {
            res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { error: err?.message || err } });
        }
    } else{
        res.status(400).send({status: "Failed type validation", data: error})
    }
};

const changePassword = async (req,res) => {
    const {id} = req.params
    const body = req.body
    try {
        const {data} = await authService.changePassword(id, body)
        res.status(200).send({data})
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

const logout = async (req,res) => {
    try {
    //    const {status} = await buttonService.getReport(id)
    const status = true;
       if(status){
        const {data} = await authService.logout()
        res.status(200).send({data: data})
        } else{
            res.status(400).send({data: 'No account logged in'})
       }
    } catch (err) {
        res
        .status(err?.status || 500)
        .send({ status: "FAILED", data: { error: err?.message || err } });
    }
};

module.exports ={
    login,
    changePassword,
    logout,
}
