const drivers = [
        {
            id:"1",
            name:"Manuel", 
            lastname:"Perez",
            plate:"45CSV9",
            unitNo:"249",
            phoneNo:"9999451635",
            gender:"M",
            memberSince:"", 
        },
        {
            id:"2",
            name:"Daniela", 
            lastname:"Alvarado",
            plate:"22ABC2",
            unitNo:"250",
            phoneNo:"9991356987",
            gender:"F",
            memberSince:"", 
        },
        {
            id:"3",
            name:"Mauricio", 
            lastname:"Lopez",
            plate:"85HYS4",
            unitNo:"251",
            phoneNo:"9995689632",
            gender:"M",
            memberSince:"", 
        },
    ]
    
const createDriver = (body) => {
    try{
        const index = (drivers.length + 1).toString()
        drivers.push(body)
        return body
    }catch (error) { throw { status: 500, error: error } }
}
    
const getDrivers = () =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

const getDriver = (idFind) =>{
    try{
        return drivers.find(({id}) => id === idFind)
    }catch (error) { throw { status: 500, error: error } }
}

const updateDriver = (idFind, body) =>{
    try{
        let driverIndex = drivers.findIndex(({id}) => id === idFind)
        drivers[driverIndex] = body
        return Driver
    }catch (error) { throw { status: 500, error: error } }
}

const deleteDriver = (idFind) => {
    try{
        drivers = drivers.filter(({id}) => id !== idFind)
        return drivers.find(({id}) => id === idFind)
    }catch (error) { throw { status: 500, error: error } }
}

module.exports = {
    createDriver,
    getDrivers, 
    getDriver,
    updateDriver,
    deleteDriver,
}