const validateBody = (body) =>{
    const { action, date, driver_name, plate, unit_no } = body
    if(typeof(action) !== "number" || !action){
        return { status:false, error:"Incorrect value 'action'"}
    }
    if(!date){
        return {status:false, error:"Incorrect value 'date'"}
    }

    if(typeof(driver_name) !== "string" || !driver_name){
        return { status:false, error:"Incorrect value 'driver name'"}
    }
    if(typeof(plate) !== "string" || !plate){
        return { status:false, error:"Incorrect value 'plate'"}
    }
    if(typeof(unit_no) !== "string" || !unit_no){
        return { status:false, error:"Incorrect value 'unit_no'"}
    }
    
    return { status:true , error:"none"}
}

const validateId = (id) =>{
    if( typeof(id) !== "string"){
        return {status: false, error: "Button parameter ':id' is not a number"}
    }
    if(!id){
        return {status: false, error: "Button parameter ':id' cannot be empty"}
    }
    return {status: true, error: "none"}
}

module.exports = { 
    validateBody,
    validateId
}