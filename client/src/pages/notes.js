import React from "react";
import { useState } from "react";
import Axios from "axios";

function Notes () {
    //const[notes,setNotes]=useState("");
    const[note_content,setNotes]=useState("");
    const[notesList,setNotesList]=useState([]);
    const[newNotes,setnewNotes]=useState("");

    const addNotes = () =>{
        Axios.post("http://localhost:3001/notes",{
            note_content:note_content,
    }).then(() =>{
        setNotesList([...notesList, {
            note_content:note_content,
        },
        ]);
    });
        };

        const getNotes =() =>{
            Axios.get("http://localhost:3001/notes").then((response)=>{
                setNotesList(response.data);
            });
        };
        const updateNotes=(id)=>{
            Axios.put("http://localhost:3001/updatenotes",{notes:newNotes,id:id}).then(
              (response) =>{
                setNotesList(
                  notesList.map((val) =>{
                    return val.note_id ===id
                      ?{
                        id:val.note_id,
                        note_content:newNotes,
                      }
                      :val;
                  })
                );
              }
      );
          };
        const deleteNotes=(note_id)=>{
          Axios.delete(`http://localhost:3001/deletenotes/${1}`).then((response)=> {
            setNotesList(
              notesList.filter((val)=>{
              return val.note_id!==note_id;
            }))
          })
        };
    
return (
  <div>
    <div class="topnav">
      <a href="/" class="active" id="homePage">Home</a>
      <a href="./statistics" id="stats">Statistics</a>
      <a href="" id="calendar">Calendar</a>
      <a href="./notes" id="notes">Notes</a>
      <a href="" id="settings">Settings</a>
      <a href="" id="logOut">Log out</a>
    </div>
    <input type="text" class="n_inp" placeholder="Input notes here" onChange={(event)=>{
      setNotes(event.target.value)
    }} />
    <button onClick={addNotes} class="note_btn">Add note</button>
    <div className="notesHandler">
      <button onClick={getNotes}>Show notes</button>
      {notesList.map((val,key) =>{
        return(
          <div className="notes">
            <div>
              <p>Note:{val.note_content}</p>
              </div>
              <div>
                {" "}
            <input type="text" placeholder="Input updated notes here" onChange={(event) =>{
            setnewNotes(event.target.value);
            }}
            />
            <button onClick={()=>{updateNotes(val.note_id)}}class="note_btn">Modify note</button>
            <button onClick={() =>{deleteNotes(val.note_id)}}class="note_btn">Delete</button>
            </div>
            </div>
        );
      })}
    </div>
  </div>

)
}

export default Notes;