import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


function Filters(){

const allTypes = useSelector(state => state.types)


    return(
        <div>

            <div>
            <span>Filter by Source</span>
            <select>
                <option value="All">All</option>
                <option value="API">API</option>
                <option value="Database">Database</option>
            </select>
            </div>


            <div>
            <span>Alphabetical Order</span>
            <select>
                <option value="Ascending">A-Z</option>
                <option value="Descending">Z-A</option>
            </select>
            </div>


            <div>
            <span>Order by Attack</span>
            <select>
                <option value="High">High</option>
                <option value="Low">Low</option>
            </select>
            </div>

            <div>
            <span>Filter by Type</span>
            <select>
            {allTypes?.map((e, index) => (<option key={index} value={e.name}>{e.name}</option>))}
            </select>
            </div>

        </div>
    )
}

export default Filters;