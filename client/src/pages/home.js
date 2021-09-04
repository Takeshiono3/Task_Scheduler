import React from "react";
import './home.css';
import { useState } from "react";
import Axios from "axios";

function Home() {
  const[task,setTask]=useState("");
  const[newTask,setnewTask]=useState("");
  const[taskList,setTaskList]=useState([]);
  const[timeStart,settimeStart]=useState("");
  const[timeEnd,settimeEnd]=useState("");
 

  const addTask =  () =>{
    Axios.post("http://localhost:3001/create",{
      task: task,
      timeStart:timeStart,
      timeEnd:timeEnd,
    }).then(() =>{
      setTaskList([...taskList, {
        task:task,
      },
      ]);
    });
  };
  const getTask = () =>{
    Axios.get("http://localhost:3001/users2").then((response)=>{
      setTaskList(response.data);
     });
    }
  const updateTask=(id)=>{
      Axios.put("http://localhost:3001/update",{task:newTask,id:id}).then(
        (response) =>{
          setTaskList(
            taskList.map((val) =>{
              return val.id ===id
                ?{
                  id:val.id,
                  timeStart:val.timeStart,
                  timeEnd:val.timeEnd,
                  task:newTask,
                }
                :val;
            })
          );
        }
);
    };
  const deleteTask=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
      setTaskList(
        taskList.filter((val)=>{
        return val.id!= id;
      }))
    })
  };
    

    
  
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
    <input type="datetime-local" id="end" placeholder="End time" class="inp" onChange={(event) =>{
      settimeEnd(event.target.value)
    }}/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <br></br><button  onClick={addTask} class="btn"><i class="fa fa-plus"></i></button>
    <button class="btn"><i class="fa fa-trash"></i></button>
    <div className="tasks">
      <button onClick={getTask}>Show tasks</button>
    {taskList.map((val,key) =>{
      return(
      <div className="tasks">
        <div>
          <p>Task:{val.aab}</p>
          <p>Start Time:{val.time_start}</p>
          <p>End Time:{val.time_end}</p>
        </div>
      <div>
      {" "}
      <input type="text"onChange={(event) =>{
      setnewTask(event.target.value);
    }}
    />
      <button onClick={ ()=>{
        updateTask(val.id)}} class="btn">Update?
        </button>
        
     <button onClick={ ()=>{
        deleteTask(val.id)}}class="btn"><i class="fa fa-trash"></i></button>
    </div>
    </div>
      );
})}

    </div>
  
  </div>

  )
 
}


export default Home