import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../Components/Todo.css';

const EditeTask=({ old_id, old_title, getTasks, setEditForm })=> {

    const [title, setTitle]= useState(old_title);

    //On modifie le titre de la tâche sélectionnée

    const edition=(e)=>{
        e.preventDefault();
        if( title!== "" ){
            axios.patch(`/tasks/${old_id}`,{title} ).then(
            (resp)=>{
                getTasks();
                setEditForm(false);
                setTitle("");
                console.log(resp);
            },
            (error)=>{
                console.log(error);
            }
        )
    }
}
    
    return(
            <div className="row">
                <h3 className="title-edite-todo"> Modification de tâches</h3>
                <form className="col-s12" onSubmit={ (e)=>edition(e)} id="form-edite-todo">
                    <div className="input-field col s6">
                        <input id="todo" type="text" className="todo-edit-task"
                        value={title}
                        onChange={
                            (e)=>{
                                setTitle(e.target.value);
                                console.log(e.target.value);
                            }}

                        />
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            <i className="large material-icons right">edit</i>
                        </button>
                    </div>
                </form>
            </div>
    )

}
export default EditeTask;
