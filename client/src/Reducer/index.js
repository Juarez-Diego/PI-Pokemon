
const initialState = {
    pokemon: [],
    pokemonCopy: [],
    types: [],
    pokemonDetail: []
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_POKEMON":
            return{
                ...state,
                pokemon: action.payload,
                pokemonCopy: action.payload
            }
        
        case "GET_TYPES":
            return{
                ...state,
                types: action.payload
            } 

        case "GET_BY_NAME":
            return{
                ...state,
                pokemon: action.payload
            }
        
        case "GET_DETAIL":
            return{
                ...state,
                pokemonDetail: action.payload
            }
        
        case "CREATE_POKEMON":
            return{
                ...state
            }

        default: return state;
    }
};

export default rootReducer;