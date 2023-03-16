const drivers = [
        {
            name:"Manuel", 
            lastname:"Perez",
            plate:"45CSV9",
            unitNo:"249",
            phoneNo:"9999451635",
            gender:"M",
            memberSince:"", 
        },
        {
            name:"Daniela", 
            lastname:"Alvarado",
            plate:"22ABC2",
            unitNo:"250",
            phoneNo:"9991356987",
            gender:"F",
            memberSince:"", 
        },
        {
            name:"Mauricio", 
            lastname:"Lopez",
            plate:"85HYS4",
            unitNo:"251",
            phoneNo:"9995689632",
            gender:"M",
            memberSince:"", 
        }
        ]

const getAlldrivers = () =>{
    try{
        return drivers
    }catch (error) { throw { status: 500, error: error } }
}

module.exports = {
    getAlldrivers
}