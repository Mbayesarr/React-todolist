import "./App.css";
import { useState } from "react";
import React from 'react'
import Addtodo from "./Addtodo";
import ListTodo from "./ListTodo";

function App() {

    const [listTask, setlistTask] = useState(["Tache 1", "Tache 2"])

    return (
        <>
            <div>
                <Addtodo />
                <hr color="gray" />
                <div className="filter w-100 mx-auto">
                    <input type="text" placeholder="filter task by title" className="form-control w-50 mx-auto" />
                    <i className="fa fa-search" aria-hidden="true" />
                </div>
                <ListTodo list={listTask} />
            </div>
        </>
    )
}

export default App
