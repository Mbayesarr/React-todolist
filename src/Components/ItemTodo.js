import React from 'react'

const ItemTodo = ({title}) => {
    return (
        <li className="list-group-item m-2 border">
            <span>{title}</span>
            <button className="btn btn-danger float-end"><i className="fa fa-trash" aria-hidden="true" /></button>   
        </li>
    )
}

export default ItemTodo
