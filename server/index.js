const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "task_scheduler",
});
app.post("/create", (req, res) => {
  const task = req.body.task;
  const timeStart = req.body.timeStart;
  const timeEnd = req.body.timeEnd;

  /////////////////////////////////////////
  var duration = new Date(timeEnd).getTime() - new Date(timeStart).getTime();

  db.query(
    "INSERT INTO tasks (name,time_start,time_end,duration) VALUES (?,?,?,?)",
    [task, timeStart, timeEnd, duration],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insertion successful");
      }
    }
  );
});

app.post("/notes", (req, res) => {
  const notes = req.body.notes;
  db.query(
    "INSERT INTO notes (note_content) VALUES (?)",
    [notes],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insertion successful");
      }
    }
  );
});

app.post("/register", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const userPass = req.body.userPass;
  db.query(
    "INSERT INTO registered_users (user_name,email,password) VALUES (?,?,?)",
    [userName, email, userPass],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Creation of user successful");
      }
    }
  );
});

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const timeStart = req.body.timeStart;
  const timeEnd = req.body.timeEnd;
  var duration = new Date(timeEnd).getTime() - new Date(timeStart).getTime();

  db.query(
    "UPDATE tasks SET name=? , time_start=? ,  time_end=? , duration=?  WHERE id=?",
    [name, timeStart, timeEnd, duration, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/updatenotes", (req, res) => {
  const id = req.body.id;
  const notes = req.body.notes;
  db.query(
    "UPDATE notes SET note_content=? WHERE note_id=?",
    [notes, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tasks WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/deletenotes/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM notes WHERE note_id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Your server is running on port 3000!");
});