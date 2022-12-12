const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const todolist = require('./models/todolist');
const user = require('./models/user');
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/todolistdb')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cors
let cors = require('cors')
app.use(cors())

/*//Authorisation
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*")
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
next()
})*/

app.get('/api/taches/:id', async (req, res) => {
    let todolists = await todolist.find({foreignKey : req.params.id})
    res.json(todolists)
})

app.post('/api/tache/', async (req, res) => {
    await todolist.create(req.body, (error,todolist)=>{console.log(error,todolist)})
    res.end()  
}) 

app.delete('/api/tache', async (req, res) => {
    await todolist.deleteOne({ id: req.body.rm })
    res.end()
})

app.put('/api/tache', async (req, res) => {
    await todolist.findOneAndUpdate({id : req.body.up}, {text : req.body.toDo})
    res.end()
})

app.post('/api/user/', async (req, res) => {
    const aUser = await user.findOne({ email : req.body.email})
    if(!aUser || !aUser.email) {
        await user.create(req.body, (error,user)=>{console.log(error,user)})
        res.json(true)
    }
    else{
        res.json(false)
    }
}) 

app.post('/api/isuser/', async (req, res) => {
    const aUser = await user.findOne({ email : req.body.email})
    if(aUser && aUser.mdp == req.body.mdp){
        res.json(aUser.id)
    }
    else {
        res.json(false)
    }
})

app.listen(port,()=>{
console.log(`Express app listening at http://localhost:${port}`);
})

