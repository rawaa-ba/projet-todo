const express = require('express');
const { Todo } = require('./../models/todo');

var app = express();

app.get('/', (req, res) => {
    res.status(200).send({ message: 'welcom to todo Controller' })
})

app.post('/add', (req, res) => {
    let data = req.body;
    let todo = new Todo({
        description: data._description,
        idUser: data._idUser
    })
    todo.save().then((todoFromdb) => {
        console.log(todoFromdb);
        res.status(200).send({ message: "todo ajouté avec succés" })

    }).catch((erreur) => {
        res.status(400).send(erreur)
    })

})

app.get('/list/:idUser', (req, res) => {
    let idUser = req.params.idUser
    Todo.find({ idUser: idUser }).then((todos) => {
        console.log(todos)
        let todoList = [];
        let doneList = [];
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].etat) {
                todoList.push(todos[i]);
            }
            else{
                doneList.push(todos[i]);
            }
        }
        res.status(200).send({todoList,doneList})
    }).catch((erreur) => {
        res.status(400).send(erreur)
    })
})

app.put('/done',(req,res)=>{
    let idTodo = req.body._id
    Todo.findByIdAndUpdate({_id:idTodo},{etat:true,dateFin:new Date()},{new:true}).then((todo)=>{
        res.status(200).send({message:"todo terminer avec succées"})
    }).catch((erreur)=>{
        res.status(400).send(erreur);
        
    })
})
app.put('/update',(req,res)=>{
    let description = req.body._description;
    let idTodo = req.body._id;
    Todo.findByIdAndUpdate({_id:idTodo},{description},{new:true}).then((todo)=>{
        res.status(200).send({message:"todo modifié avec succées"})
    }).catch((erreur)=>{
        res.status(400).send(erreur);
        
    })
})
app.delete('/delete',(req,res)=>{
    let idTodo = req.body._id;
    Todo.findByIdAndDelete({_id:idTodo}).then((todo)=>{
        res.status(200).send({message:"todo supprimé avec succées"})
    }).catch((erreur)=>{
        res.status(400).send(erreur);
        
    })
})
module.exports = app