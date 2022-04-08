import React from "react";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { sortAlphabetically, sortByAttack, filterBySource, filterByType } from "../../Actions";

function Filters(){

const allTypes = useSelector(state => state.types)

const dispatch = useDispatch()
const [temp, setTemp] = useState("")
const [renderPage, setRenderPage] = useState("")
const [currentPage, setCurrentPage] = useState(1)

function sortAlpha(e){
    dispatch(sortAlphabetically(e.target.value))
}

function sortAttackPoints(e){
    dispatch(sortByAttack(e.target.value))
}

function filterSource(e){
    dispatch(filterBySource(e))
}

function filterType(e){
    dispatch(filterByType(e))
}

    return(
        <div>

            <div>
            <span>Filter by Source</span>
            <select onChange={e => filterSource(e)}>
                <option value="All">All</option>
                <option value="API">API</option>
                <option value="Database">Database</option>
            </select>
            </div>


            <div>
            <span>Alphabetical Order</span>
            <select onChange={e => sortAlpha(e)}>
                <option value="Ascending">A-Z</option>
                <option value="Descending">Z-A</option>
            </select>
            </div>


            <div>
            <span>Order by Attack</span>
            <select onChange={e => sortAttackPoints(e)}>
                <option value="High">High</option>
                <option value="Low">Low</option>
            </select>
            </div>

            <div>
            <span>Filter by Type</span>
            <select onChange={e => filterType(e)}>
            <option className="filters-option" value="All"> All </option>
            {allTypes?.map((e, index) => (<option key={index} value={e.name}>{e.name}</option>))}
            </select>
            </div>

        </div>
    )
}

export default Filters;