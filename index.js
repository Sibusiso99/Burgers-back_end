import express from "express"
import mysql from "mysql"
import cors from "cors"



const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers"
})

app.use(express.json())
app.use(cors())
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
        }
        else{
            return res.json("Burger created")
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