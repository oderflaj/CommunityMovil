export default (state={modulo:'Alarm', objeto:[]},action)=>{
    switch(action.type)
    {
        case 'selected_module':
            return action.payload
        default:
            return state
    }
}