const validateBody = (body) =>{
    const {name, address, coordinates, coordinates_delta} = body
    
    if(typeof(name) !== "string" || !name){
        return { status:false, error:"Incorrect value 'name'"}
    }

    if(typeof(address) !== "string" || !address){
        return { status:false, error:"Incorrect value 'address'"}
    }
    
    if(!coordinates){
        return { status:false, error:"Must have value 'coordinates'"}
    }else{
        if( typeof(coordinates.latitud) !== "number" ){
        return { status:false, error:"Incorrect value 'latitud' from coordinates"}
        }
        if( typeof(coordinates.longitud) !== "number" ){
        return { status:false, error:"Incorrect value 'longitud' from coordinates"}
        }
    }

    if(!coordinates_delta){
        return { status:false, error:"Must have value 'coordinates_delta'"}
    }else{
        if( typeof(coordinates_delta.latitud) !== "number" ){
        return { status:false, error:"Incorrect value 'latitud' from coordinates delta"}
        }
        if( typeof(coordinates_delta.longitud) !== "number" ){
        return { status:false, error:"Incorrect value 'latitud' from coordinates delta"}
        }
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