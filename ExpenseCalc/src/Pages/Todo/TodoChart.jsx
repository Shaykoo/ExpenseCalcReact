import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

window.addEventListener("load", () => {
    creatingChart();
});
export let todoChart;
export const creatingChart = () => {
    Chart.register(...registerables);
    const ctx = document?.getElementById("todo-chart")?.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#001d7a86");
    let todoData = JSON.parse(localStorage?.getItem("todos"));

    if (!todoData) {
        todoData = [{date:"0",value:0}]
    }

    const labels = todoData?.map((item) => item.date);
    console.log(todoData);

    const data = {
        labels,
        datasets: [
            {
                label: "todoData",
                data: [...todoData?.map((item) => parseInt(item?.value))],
                fill: true,
                backgroundColor: gradient,
                tension: 0.4,
                borderColor: "#002b86",
            },
        ],
    };

    const tickConfig = {
        color: "#fff",
        font: {
            family: "montserrat",
        },
    };

    const config = {
        data,
        type: "line",
        options: {
            responsive: true,
            scales: {
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        ...tickConfig,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        ...tickConfig,
                        font: {
                            size: 11,
                        },
                    },
                },
            },
        },
    };

    todoChart = new Chart(ctx, config);
};

const TodoChart = () => {
    return (
        <div className="chart bg-indigo-700 p-1 rounded-md">
            <canvas id="todo-chart"></canvas>
        </div>
    );
};

export default TodoChart;
