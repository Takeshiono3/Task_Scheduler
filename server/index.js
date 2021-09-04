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
    database:"student_tasks",
});
    app.post('/create', (req,res) => {
        const task=req.body.task;
        const timeStart=req.body.timeStart;
        const timeEnd=req.body.timeEnd;
    
    db.query(
        "INSERT INTO users (aab,time_start,time_end) VALUES (?,?,?)",
        [task,timeStart,timeEnd],
        (err,result) => {
            if(err) {
                console.log(err);
            }else{
                res.send("Insertion successful");
            }
        }
    );
});
app.get('/users2', (req,res) => {
    db.query("SELECT * FROM users",(err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }

    });

});

app.put("/update", (req,res) => {
    const id=req.body.id;
    const task=req.body.task;
    db.query(
        "UPDATE users SET aab=? WHERE id=?",
        [task,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});
app.delete('/delete/:id',(req,res) =>{
    const id=req.params.id
    db.query("DELETE FROM users WHERE id=?",id,(err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
        });
    });


app.listen(3001, () =>{
console.log("HUHUUUUU");
});