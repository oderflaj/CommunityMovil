import {createStore} from "redux"

const reducer = (state, action) => {

    if(action.type === "UPDATE_INFOBASE"){
        return{
            ...state,
            infobase:action.infobase
        }
    }

    return state
}

export default createStore(reducer,{infobase:{}})