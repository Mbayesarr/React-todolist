import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DeleteModal=({modal,id,getTasks})=> {


//Fonction qui supprime la tâche sélectionnée
const deleteTask=(id)=>{

    axios.delete(`http://localhost:3000/tasks/${id}`).then(
         (resp)=>{
             //Aprés la suppression, on réaffiche instantanément la liste des taches restantes
             getTasks();
             console.log("Deleted successfully");
         },
         (error)=>{
             console.log(error);
         }
     )
 }
    return (
        <div>
        <Dialog
            open={modal}
            onClose={modal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Suppression ..."}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Voulez-vous vraiment supprimer cette tâche?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={
                 ()=> {
                    modal(false)
                    getTasks()
                }} color="primary">
                Annuler
            </Button>
            <Button onClick={ 
                ()=> {
                   deleteTask(id) 
                   modal(false)
                }} color="primary">
                Supprimer
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )}
  export default DeleteModal;