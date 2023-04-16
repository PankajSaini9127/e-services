export function reducer (state,action){
    switch (action.type){
        case "LOGIN": return {...state,isAuth: !state.isAuth};

        case "ALERT" : return {...state, alert:action.payload}

        default :return state
    }
}