import React, { useEffect } from "react";
import "./home.css";
import { useState } from "react";
import axios from "axios";
import { intervalToDuration, formatDuration, addDays } from "date-fns";

function Home() {
  const [currentTask, setCurrentTask] = useState(null);
  const [task, setTask] = useState({
    name: "",
    timeStart: new Date(),
    timeEnd: addDays(new Date(), 2),
  });
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (currentTask) {
      setTask({
        id: currentTask.id,
        name: currentTask.name,
        timeStart: currentTask.time_start,
        timeEnd: currentTask.time_end,
      });
    }
    // eslint-disable-next-line
  }, [currentTask]);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addOrEditTask = async (e) => {
    e.preventDefault();

    const { name, timeStart, timeEnd } = task;

    if (task.id) {
      // Update Task
      await updateTask(task.id);
      // Update Task List

      return;
    } else {
      const res = await axios.post("http://localhost:3001/create", {
        task: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
      });

      const task = {
        name: name,
        time_start: timeStart,
        time_end: timeEnd,
      };

      setTaskList(taskList.concat(task));
    }
  };
  const getTask = () => {
    axios.get("http://localhost:3001/tasks").then((response) => {
      setTaskList(response.data);
    });
  };
  const updateTask = async (id) => {
    const res = await axios.put("http://localhost:3001/update", {
      name: task.name,
      timeStart: task.timeStart,
      timeEnd: task.timeEnd,
      id: id,
    });

    setTaskList(
      taskList.map((task) => {
        return task.id === id
          ? {
              id: task.id,
              time_start: task.timeStart,
              time_end: task.timeEnd,
              name: task.name,
            }
          : task;
      })
    );
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setTaskList(
        taskList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  ////////////////////////////////////////

  /*
(function() {
  ('input[name="daterange"]').daterangepicker({
    opens: 'left',
  }, function(start, end, label) {
     document.getElementById('start time').value = start.format('YYYY-MM-DD');
     document.getElementById('end time').value = end.format('YYYY-MM-DD');
  });
  ('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) { 
      var date1 = new Date(start.format('YYYY-MM-DD'));
      var date2 = new Date(end.format('YYYY-MM-DD'));
      var timeDiff = Math.abs(date2.getTime() - date1.getTime()); 
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1);                                     
      $('.duration_days').html(diffDays+' Days');
 });
});
*/

  return (
    <div>
      <div class="topnav">
        <a href="/" class="active" id="homePage">
          Home
        </a>
        <a href="./statistics" id="stats">
          Statistics
        </a>
        <a href="" id="calendar">
          Calendar
        </a>
        <a href="./notes" id="notes">
          Notes
        </a>
        <a href="" id="settings">
          Settings
        </a>
        <a href="" id="logOut">
          Log out
        </a>
      </div>

      <form onSubmit={addOrEditTask}>
        <input
          type="text"
          placeholder="Input task name here"
          class="inp"
          name="name"
          value={task.name}
          onChange={onChange}
        />
        <br></br>
        <label for="start time">Input Start Time Here: </label>
        <input
          type="datetime-local"
          id="start time"
          placeholder="Start time"
          class="inp"
          name="timeStart"
          value={task.timeStart}
          onChange={onChange}
        />
        <br></br>
        <label for="end time">Input End Time Here: </label>
        <input
          type="datetime-local"
          id="end time"
          placeholder="End time"
          name="timeEnd"
          class="inp"
          value={task.timeEnd}
          onChange={onChange}
        />

        <br></br>
        <button type="submit" class="btn">
          <i class={`fa ${currentTask ? `fa-edit`:'fa-plus'}`}></i>
        </button>
      </form>

      <div className="tasks">
        <button onClick={getTask}>Show Tasks</button>
        {taskList.map((task, key) => {
          return (
            <div className="tasks">
              <div>
                <p>Task:{task.name}</p>
                <p>Start Time:{task.time_start}</p>
                <p>End Time:{task.time_end}</p>
                {task.time_end && (
                  <p>
                    Duration:{" "}
                    {formatDuration(
                      intervalToDuration({
                        start: new Date(task.time_start).getTime(),
                        end: new Date(task.time_end).getTime(),
                      })
                    )}
                  </p>
                )}
              </div>
              <div>
                <button
                  onClick={() => {
                    console.log("Tada");
                    setCurrentTask(task);
                  }}
                  class="btn"
                >
                  Modify this task
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                  class="btn"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;