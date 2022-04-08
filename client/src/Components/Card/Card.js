import React from "react";
import "../../Images/Pokedex.jpg"


function Card({name, image, types }){
const def = "https://gcdn.lanetaneta.com/wp-content/uploads/2022/01/Pokemon-necesita-una-Pokedex-100-nueva-Adios-Pikachu.jpg"
    return(
        <div>
            <img src={image} onError={(e)=>{e.target.onerror = null; e.target.src=def}} alt="img" width="120" height="120"></img>

                <div>
                <h2>{name}</h2>
                </div>

                <div>
                <h3>{types}</h3>
                </div>
        </div>
    )
}

export default Card;