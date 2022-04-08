import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../../Actions";



function formValidation(input){
    let formErrors = {};

    if(!input.name){
        formErrors.name = "Name is required";
    }
    if(!input.types || input.types.length === 0){
        formErrors.types = "Please include at least one Type"
    }
    if(!input.hp){
        formErrors.hp = "Please give your pokemon hp"
    }
    if(input.hp < 1 || input.hp > 100){
        formErrors.hp = "Hp must be between 1 and 100"
    }
    if(!input.attack){
        formErrors.attack = "Please add attack points"
    }
    if(input.attack < 1 || input.attack > 100){
        formErrors.attack = "Attack points must be between 1 and 100"
    }
    if(!input.defense){
        formErrors.defense = "Please add defense points"
    }
    if(input.defense < 1 || input.defense > 50){
        formErrors.defense = "Defense points must be between 1 and 50"
    }
    if(!input.weight || input.weight === 0){
        formErrors.weight = "Weight cannot be 0"
    }
    if(!input.height || input.height === 0){
        formErrors.height = "Height cannot be 0"
    }
    
    return formErrors;
}


function Form(){

const dispatch = useDispatch()
const allTypes = useSelector(state => state.types)

const [formErrors, setFormErrors] = useState({})
const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    weight: "",
    height: "",
    image: ""
})

useEffect(() => {                
    dispatch(getTypes())
}, [])

function handleSubmit(e){
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    setFormErrors(formValidation({
        ...input,
        [e.target.name]: e.target.value
    }))
}

function handleSelectTypes(e){
    e.preventDefault()
    if(!input.types.includes(e.target.value)){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        setFormErrors(formValidation({
            ...input,
            types: e.target.value
        }))
    }
}

function handleDelete(e){
    setInput({
        ...input,
        types: input.types.filter(v => v !== e)
    })
}

function submit(e){
    e.preventDefault()
    if(Object.values(formErrors).length > 0 || input.name === "" || input.types.length === 0){
        alert("Please fill in all the required fields")
    } else{
        dispatch(createPokemon(input))
        alert("Pokemon created successfully!")
    }
}

    return(
        <div>

           <div>
                <h1>Fill in the fields</h1>
            </div>
            {console.log("Estos son los errores", formErrors)}
            {console.log(input)}
            <form onSubmit={submit}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name="name" onChange={handleSubmit}></input>
                    {formErrors.name && (<p>{formErrors.name}</p>)}
                    <br />

                    <label>Hp: </label>
                    <input type="number" value={input.hp} name="hp" onChange={handleSubmit}></input>
                    {formErrors.hp && (<p>{formErrors.hp}</p>)}
                    <br />

                    <label>Attack: </label>
                    <input type="number" value={input.attack} name="attack" onChange={handleSubmit}></input>
                    {formErrors.attack && (<p>{formErrors.attack}</p>)}
                    <br />

                    <label>Defense: </label>
                    <input type="number" value={input.defense} name="defense" onChange={handleSubmit}></input>
                    {formErrors.defense && (<p>{formErrors.defense}</p>)}
                    <br />

                    <label>Height: </label>
                    <input type="number" value={input.height} name="height" onChange={handleSubmit}></input>
                    {formErrors.height && (<p>{formErrors.height}</p>)}
                    <br />

                    <label>Weight: </label>
                    <input type="number" value={input.weight} name="weight" onChange={handleSubmit}></input>
                    {formErrors.weight && (<p>{formErrors.weight}</p>)}
                    <br />

                    <label>Image: </label>
                    <input type="text" value={input.image} name="image" onChange={handleSubmit}></input>
                    <br />
                </div>

                {/* //////////////////////////////DROPDOWN FOR TYPES/////////////////////// */}
                <div>
                    {formErrors.types && (<p>{formErrors.types}</p>)}

                    <span>Types: </span>
                    <select  onChange={e => handleSelectTypes(e)}>
                    {allTypes?.map((e, index) => (<option key={index} name="types" value={e.name}>{e.name}</option>))}
                    </select>

                    <ul>{input.types.map(e => <li key={e}>{e} <div onClick={() => handleDelete(e)}>X</div></li>)}</ul>
                </div>

                <button>CREATE</button>
            </form>
        </div>
    )
}

export default Form;