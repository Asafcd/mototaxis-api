const validateBody = (body) =>{
    const { name, lastname, gender, member_since, phone_no, plate, unit_no, date_of_birth } = body
    if(typeof(name) !== "string" || !name){
        return { status:false, error:"Incorrect value 'name'"}
    }
    if(typeof(lastname) !== "string" || !lastname){
        return { status:false, error:"Incorrect value 'lastname'"}
    }
    if(typeof(gender) !== "string" || !gender){
        return { status:false, error:"Incorrect value 'gender'"}
    }
    if(typeof(phone_no) !== "string" || !phone_no){
        return { status:false, error:"Incorrect value 'phone_no'"}
    }
    if(typeof(plate) !== "string" || !plate){
        return { status:false, error:"Incorrect value 'plate'"}
    }
    if(typeof(unit_no) !== "string" || !unit_no){
        return { status:false, error:"Incorrect value 'unit_no'"}
    }
    if(!member_since){
        return {status:false, error:"Incorrect value 'member_since'"}
    }
    if(!date_of_birth){
        return {status:false, error:"Incorrect value 'date_of_birth'"}
    }

    return { status:true , error:"none"}
}

const validateId = (id) =>{
    if( typeof(id) !== "string"){
        return {status: false, error: "Location parameter ':id' is not a number"}
    }
    if(!id){
        return {status: false, error: "Location parameter ':id' cannot be empty"}
    }
    return {status: true, error: "none"}
}

module.exports = { 
    validateBody,
    validateId
    }