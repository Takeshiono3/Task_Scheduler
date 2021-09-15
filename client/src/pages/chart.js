import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Statistics = () => {
  const [chartData, setChartData] = useState({});
  const [taskDuration, setTaskDuration] = useState([]);
  const [taskName, setTaskName] = useState([]);

  const chart = () => {
    let taskDur = [];
    let taskNam = [];
    axios
      .get("http://localhost:3001/tasks")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data) {
          taskNam.push(dataObj.name);
          taskDur.push(parseInt(dataObj.duration));
        }
        setChartData({
          labels: taskNam,
          datasets: [
            {
              label: "Duration",
              data: taskDur,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(taskDur, taskNam);
  };

  useEffect(() => {
    chart();
  }, []);
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
      <div className="App">
        <h1>Statistics(in milliseconds)</h1>
        <div>
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              title: { text: "STATISTICS", display: true },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;