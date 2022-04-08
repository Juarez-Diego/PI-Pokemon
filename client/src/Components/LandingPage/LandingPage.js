import React from "react";
import { Link } from "react-router-dom";

export function LandingPage(){

    return(
        <div>
            <h1>Pokemon App</h1>
            <h3>A web application where you can view any pokemon and even create one!</h3>

            <Link to="/home">
                <button>Let's Go!</button>
            </Link>
        </div>
    )
}

export default LandingPage;