import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditeTask from './EditeTask';
import "../Components/Todo.css";
import DeleteModal from './DeleteModal';


const Todo=()=> {

//Gère l'état de la liste des tâches
const [todos, setTodos]=useState([]);


//Gère l'état du titre de la tâche
const [title, setTitle]= useState("");


//Gère l'état de l'ancien id de la tâche (pour la modification)
const [old_id, setold_id] = useState("");


//Gère l'état de l'ancien titre de la tâche (pour la modification)
const [old_title, setold_title] = useState("");


//Gère l'état du formulaire d'édition (si elle doit s'afficher ou pas)
const [editeForm, setEditForm] = useState(false);


//Gère l'état de la boîte de dialogue (si elle doit s'ouvir ou pas)
const [openModal, setOpenModal] = useState(false);

//Gère l'état de l'id de la tâche
const [id, setId] = useState();


//Fonction qui envoie une nouvelle tache vers le serveur
const addTodo=(e)=>{
            e.preventDefault();
            if( title !== ""){
                axios.post("http://localhost:3000/tasks",{title}).then(
                    (resp)=>{
                        getTasks();
                        setTitle("");
                        console.log(resp);
                    },
                    (error)=>{
                        console.log(error);
                    }
                )
            }
        }

//Fonction qui récupère l'ensemble des tâches

const getTasks=()=>{
        axios.get("http://localhost:3000/tasks").then(
            (resp)=>{
                setTodos(resp.data);
                console.log(resp.data);
            },
            (error)=>{
                console.log(error);
            }
        )
    }

//S'exécute à chaque rechargement de la page et affiche l'ensemble des tâches dispo sur le serveur

   useEffect(()=>{
        getTasks();
    },[])

//Fonction qui met à jour le statut une tâche selon qu'elle est faîte ou pas

const completedTodo=(id,isCompleted)=>{
    axios.patch(`http://localhost:3000/tasks/${id}`,{isCompleted:isCompleted}).then(
        resp=>{
            console.log(resp.data);
            getTasks();
        },
        error=>{
            console.log(error);
        }
    )
}

    return (
        <div className="row">
            <h3 className="title-add-todo"> Ajouter une nouvelle tâche </h3>
            <form className="col-s12" id="form-add-todo" onSubmit={ (e)=> addTodo(e) }>
                <div className="input-field col s6">
                    <input id="todo" type="text" className="validate"
                    value={title}
                    onChange={
                    (e)=>{
                        setTitle(e.target.value);
                        console.log(e.target.value);
                    }}

                    />
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        <i className="material-icons right">add_circle</i>
                    </button>
                </div>
            </form>
            <div className="show-task">
                <ul>
                    {todos.map(
                        (todo)=>{
                            return(
                                <div key={todo.id}>
                                    <div className="row" id="card">
                                        <div className="col s12 m6">
                                            <div className="card blue-grey darken-1" >
                                                <div className="card-content white-text">
                                                <li 
                                                    style={{
                                                        "textDecoration": todo.isCompleted ? "line-through":"",
                                                        "textDecorationColor": todo.isCompleted ? "red":"",
                                                        "textAlign": "justify",
                                                        "position": "relative",
                                                        "top": "30px",
                                                        "left": "50px",
                                                        "width":"250px"
                                                        }}
                                                        > {todo.title} </li>
                                                    <button className="btn waves-effect waves-light"
                                                    id="edite-todo"
                                                    onClick={ ()=>{
                                                        setEditForm(true);
                                                        setold_id(todo.id);
                                                        setold_title(todo.title);
                                                    } }
                                                    > <i className="material-icons right">edit</i> 
                                                    </button>
                                                    
                                            
                                                    <button className="btn waves-effect waves-light" 
                                                    id="delete-todo"
                                                     name="action"
                                                    onClick={ ()=>
                                                        { setId(todo.id);  
                                                          setOpenModal(true);
                                                        } }
                                                    >
                                                     <i className="material-icons right">delete</i> 
                                                    </button>
                                                    <button className="btn waves-effect waves-light"
                                                    id="completed-todo"
                                                    onClick={()=>
                                                        {
                                                         completedTodo(todo.id,!todo.isCompleted);
                                                        }}
                                                     name="action">
                                                        <i className="material-icons right">done</i>
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            )
                        }
                    )}
                </ul>
                { openModal && <DeleteModal modal={setOpenModal} id={id} getTasks={getTasks} />}
                {editeForm && <EditeTask old_id={old_id} old_title={old_title}
                 getTasks= {getTasks} setEditForm= {setEditForm} 
                 /> }
            </div>       
  </div>
    )
}
export default Todo;