export function setAuth (){
    return{
        type:"LOGIN"
    }
}

export function setAlert (data){
    return{
        type:"ALERT",
        payload:data
    }
}

export function setData (data){
        return{
            type:"DATA",
            payload:data
        }
}
