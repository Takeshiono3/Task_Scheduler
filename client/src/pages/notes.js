import React from "react";
import { useState } from "react";
import Axios from "axios";

function Notes () {
    const[notes,setNotes]=useState("");
    const[notesList,setNotesList]=useState([]);

    const addNotes = () =>{
        Axios.post("http://localhost:3001/create",{
            notes:notes,
    }).then(() =>{
        setNotesList([...notesList, {
            notes:notes,
        },
        ]);
    });
        };

        const getNotes =() =>{
            Axios.get("http://localhost:3001/notes").then((response)=>{
                setNotesList(response.data);
            });
        }
    
return (
    
        <div>
    <div class="topnav">
    <a href="./home" class="active" id="homePage">Home</a>
    <a href="" id="stats">Statistics</a>
    <a href="" id="calendar">Calendar</a>
    <a href="" id="notes">Notes</a>
    <a href="" id="settings">Settings</a>
    <a href="" id="logOut">Log out</a>
  </div>
            <input type="text" class="n_inp" onChange={(event)=>{
            setNotes(event.target.value)
        }} />
        <button onClick={addNotes} class="note_btn"></button>
        <div className="ta">
            
            {notesList.map((val,key) =>{
                return(
                    <div className="notes">
                        <p>{val.notes}</p>
                        </div>
                );
            })}
        </div>
        
        </div>
    )
}

export default Notes;
