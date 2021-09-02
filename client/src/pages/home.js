import React from "react";
import './home.css';
import { useState } from "react";
import Axios from "axios";

function Home() {
  const[task,setTask]=useState("");
  const[taskList,setTaskList]=useState([]);
  const[timeStart,settimeStart]=useState("");
  const[timestartList,settimestartList]=useState([]);

  const addTask =  () =>{
    Axios.post("http://localhost:3001/create",{
      task: task,
    }).then(() =>{
      setTaskList([...taskList, {
        task:task,
      },
      ]);
    });
  };
  const addtimeStart =  () =>{
    Axios.post("http://localhost:3001/create",{
      timeStart: timeStart,
    }).then(() =>{
      settimeStart([...timestartList, {
        timeStart:timeStart,
      },
      ]);
    });
  };
  const getTask = () =>{
    Axios.get("http://localhost:3001/tasks").then((response)=>{
      setTaskList(response.data);
     });
    }

    
  
  return (
    
  <div>
    <div class="topnav">
    <a href="" class="active" id="homePage">Home</a>
    <a href="" id="stats">Statistics</a>
    <a href="" id="calendar">Calendar</a>
    <a href="./notes" id="notes">Notes</a>
    <a href="" id="settings">Settings</a>
    <a href="" id="logOut">Log out</a>
  </div>
    <input type="text" placeholder="Input task name here" class="inp" onChange={(event) => {
      setTask(event.target.value)
    }} />
    <input type="datetime-local" id="start" placeholder="Start time" class="inp" onChange={(event) =>{
      settimeStart(event.target.value)
    }} />
    <br></br><input type="datetime-local" id="start" placeholder="Start time"></input><br></br>
    <input type="datetime-local" id="stop" placeholder="End time"></input>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <br></br><button  onClick={addTask} class="btn"><i class="fa fa-plus"></i></button>
    <button class="btn"><i class="fa fa-trash"></i></button>
    <div className="tasks">
    {taskList.map((val,key) =>{
      return(
      <div className="tasks">
      <p>{val.task}</p>
      </div>
      );
})}
    </div>
  </div>

  )
 
}


export default Home
