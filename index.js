import express from "express"
import mysql from "mysql"
import cors from "cors"
import helmet from "helmet";



const app = express()

//creating connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers"
})

app.use(express.json())
app.use(cors())
app.use(helmet());


app.get("/", (req,res) =>{
    res.json("Hey Sibusiso Congratulations")
})

app.get("/types", (req,res) =>{
    const query = "Select * from types"
    db.query(query,(err,data) =>{
        if(err){
            return res.json(err)
        } 
        else{
            return res.json(data)
        }
        //console.log(res.json)
    })
})

app.post("/types", (req,res) =>{
    const query = "INSERT into types (`name`,`description`,`price`,`cover`) VALUES(?)"
    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.cover
    ];
    db.query(query,[values],(err,data) =>{
        if(err){
            return res.json(err)
        }else if(!name || !description || !price || !cover)
        {
            return res.status(400).json({error: "Missing required fields"});
        }
        else{
            return res.json("Burger created")
        }
    })
})

app.delete("/types/:id",(req,res) =>{
    const burgerId = req.params.id;
    const query = "Delete From types Where id = ?"

    db.query(query,[burgerId], (err,data) =>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json("Burger Deleted")
        }
    })
})

app.put("/types/:id",(req,res) =>{
    const burgerId = req.params.id;
    const query = "Update types set `name` = ?, `description` = ?,`price` = ?, `cover` = ? where id = ?"
    
   
        const values = [
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.cover
        ];
    

    db.query(query,[...values,burgerId], (err,data) =>{
        if(err){
            return res.status(500).json({ error: "Eror creating Burger"});
        }
        else{
            return res.status(201).json({message: "Burger Created"});
        }
    })
})
/*app.post('/types', (req,res) => {
    const {name,description,price,cover} = req.body;
    db.query("insert into types set ?",{name:name,description:description,price:price,cover:cover},(error, res) =>{
        if(error){
            console.log(error);
        }else{
            res.json({
                success: true, res, 
            }) 
        }
    })
})
*/


app.listen(8080, () => {
    console.log("Connected to the server..")
})