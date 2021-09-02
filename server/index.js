const express = require("express");
const app=express();
const mysql=require("mysql");
const cors=require("cors");
const path=require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"test",
});
    app.post('/create', (req,res) => {
        const task=req.body.task;
    
    db.query(
        "INSERT INTO users (aab) VALUES (?)",
        [task],
        (err,result) => {
            if(err) {
                console.log(err);
            }else{
                res.send("Insertion successful");
            }
        }
    );
});
app.get('/get', (req,res) => {
    db.query("SELECT * FROM users ",(err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    })

})

app.listen(3001, () =>{
console.log("HUHUUUUU");
});

