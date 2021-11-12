const express = require('express')
const app = express()
const db = require('./app/config/db')
const User = require('./app/model/user.model')
const List = require('./app/model/toDoList.model')
const jwt = require('jsonwebtoken')
const auth = require('./app/middleware/auth')

app.use(express.json())

// User.hasOne(List)
// const taskID =null

db.sync({force:true})
    .then(()=>{
        console.log("Drop and recreate table successfully")
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/',(req,res)=>{
    res.send("Hello this is ToDoList applicatication")
})

//register
app.post('/register',async (req,res)=>{
    try{
        const { email, password, username} = req.body;
        if(!(email && password && username)){
            res.status(201).send("all input is required ")
        } 

        const user = await User.create({
            email:req.body.email,
            password:req.body.password,
            username:req.body.username
        })

        //create token
        const token = jwt.sign({
            user_id:user.id, email
        },
        "my_secret_key",{
            expiresIn:"2h",
        }
        )
        //save token
        user.token = token
        console.log("key: "+token)

        //return new user
        res.status(201).json(user)
    }
    catch (err) {
        console.log(err);
      }
})

//find user
app.get('/users',(req,res)=>{
    User.findAll()
        .then((user)=>{
            res.status(200).json({
                status:true,
                message:"All users are find successfully",
                data:user
            })
        })
})

//login
app.post('/login',async (req,res)=>{
    try{
        const {username, password} = req.body
        if(!(username && password)){
            res.status(400).send("All inputs are require")
        }

        const user = await User.findOne({username})
        console.log(user)
        
        //crete token
        if(user && (password == user.password)){
            const token = jwt.sign(
                {user_id:user.id, username},
                "my_secret_key",
                {expiresIn:"2h"}
            )
            //save token 
            user.token = token 

            //rerturn new user
            res.status(201).json(user)
        }
    }
    catch(err){
        console.log(err)
    }
})

//create list
app.post('/create',auth,(req,res)=>{
    const {task_name, description, priority, status, due_date} = req.body;
        if(!(task_name && description && priority && status && due_date)){
            res.status(201).send("all input is required ")
        } 
    List.create({
        task_name: req.body.task_name,
        description:req.body.description,
        priority:req.body.priority,
        status:req.body.status,
        due_date:req.body.due_date
    })
        .then((data)=>{
            res.status(200).json({
                status:true,
                message:"Successfully created list",
                data:data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
})

//find all task
app.get('/all',auth,(req,res)=>{
    List.findAll()
        .then((data)=>{
            res.status(200).json({
                status:true,
                message:"SuccessFull find all list",
                data:data
            })
        })
        .catch((err)=>[
            console.log(err)
        ])
})

//update
app.put('/update/:listID',auth,(req,res)=>{
    const id = req.params.listID
    
    const {description, priority, status, due_date} = req.body;
        if(!(description && priority && status && due_date)){
            res.status(401).send("all input is required ")
        } 

    List.update({
        description:req.body.description,
        priority:req.body.priority,
        status:req.body.status,
        due_date:req.body.due_date
    },{
        where:{id:id}
    })
        .then(()=>{
            res.status(200).json({
                status:true,
                message:"List update successfully of id :"+id
            })
        })
        .catch((err)=>{
            console.log(err)
        })
})

//delete list
app.delete('/delete/:listID',auth,(req,res)=>{
    const id = req.params.listID
    List.destroy({
        where:{id:id}
    })
        .then(()=>{
            res.status(200).json({
                status:true,
                message:"List delete successfully of id :"+id
            })
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.listen(5001,()=>{
    console.log("Server listen on port 5001")
})