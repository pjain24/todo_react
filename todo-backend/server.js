const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()


const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('./controllers/todoController')
//App config
const app = express();

const port = process.env.PORT || 8000

const connectionURL = process.env.MONGO_URI 
//Middlewares
//convert to JSON

app.use(express.json())
app.use(Cors())

//DBconfig
mongoose.connect(connectionURL)
.then(() =>{
    app.listen(port, () => console.log(`Running on port: ${port}`))
})
.catch((err) => {
    console.log(err);
});
//API Endpoints

//get to do list
app.get('/todos', getTodos)
//create to do list
app.post('/todos', createTodo)
//update to do list
app.put('/todos/:id', updateTodo)
//delete to do list
app.delete('/todos/:id', deleteTodo)