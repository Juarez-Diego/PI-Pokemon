
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

        case "SORT_ALPHABETICALLY":
            const alphabet = action.payload === "Ascending" ?
            state.pokemon.sort((a,b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            }) :
            state.pokemon.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            })
            return{
                ...state,
                pokemon: [...alphabet]
            }
        
        case "SORT_BY_ATTACK":
            const sortAttack = action.payload === "High" ?
            state.pokemon.sort((a, b) => {
                if(a.attack < b.attack) return 1;
                if(b.attack < a.attack) return -1
                return 0;
            }) :
            state.pokemon.sort((a, b) => {
                if(a.attack < b.attack) return -1;
                if(b.attack < a.attack) return 1;
                return 0;
            })
            return {
                ...state,
                pokemon: [...sortAttack]
            }

        case "FILTER_BY_SOURCE":
            if(action.payload === "All"){
                return {
                    ...state,
                    pokemon: state.pokemonCopy
                }
            } else if(action.payload === "Database"){
                return{
                    ...state,
                    pokemon: state.pokemonCopy.filter(e => e.createdInDb === true)
                }
            } else{
                return {
                    ...state,
                    pokemon: state.pokemonCopy.filter(e => e.createdInDb === undefined)
                }
            }

        case "FILTER_BY_TYPE":
            const getTypes = state.pokemonCopy
            const filtering = action.payload === "All" ? getTypes :
            state.pokemon.filter(e => {
                if(e.types) {
                    if(e.types.includes(action.payload)){
                        return e
                    }
                }
            })
            return{
                ...state,
                pokemon: filtering,
                pokemonCopy: getTypes
            }

        default: return state;
    }
};

export default rootReducer;