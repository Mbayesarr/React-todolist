import React from 'react'
import { useRef } from 'react'
const Addtodo = () => {

    const inputTask = useRef("")
    const onAddTask = () => {
        let input_value = inputTask.current.value;
        inputTask.current.value = "";
    }

    return (
        <header>
            <h1 className="text-center">Add Todo</h1>
            <div className="d-flex justify-content-center">
                <input type="text"
                    placeholder="Add todo"
                    className="forn-control w-50"
                    ref={inputTask}
                />
                <button className="btn btn-success text-uppercase m-2 " onClick={() => onAddTask()}>
                    <i className="fa fa-plus" aria-hidden="true" />
                </button>
            </div>
        </header>
    )
}

export default Addtodo
