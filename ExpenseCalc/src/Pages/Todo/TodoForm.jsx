import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import { todoChart } from "./TodoChart";



export const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];


const TodoForm = ({ todos, setTodos }) => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitData = (data) => {
        data.id = uuidV4();
        data.date = new Date(Date.now()).toLocaleString().split(",")[0];
        setTodos([...todos, data]);
        localStorage.setItem("todos", JSON.stringify([...todos, data]));
        todoChart.config.data.labels = [...todos,data].map(item => item?.date)
        todoChart.config.data.datasets[0].data = [...todos,data].map(item => parseInt(item?.value));
        todoChart.update()
        document.getElementById("todo__value__input").value = " ";
    };

    console.log("rendering");
    return (
        <form className="p-3" onSubmit={handleSubmit(handleSubmitData)}>
            <div className="flex flex-wrap justify-center gap-y-2">
                <input
                    id="todo__value__input"
                    type={"number"}
                    placeholder="number"
                    {...register("value", { required: true })}
                    className={` p-3 focus:outline-0 w-1/2 focus:bg-indigo-100 border ${errors.value ? "border-red-500 bg-red-200 focus:bg-red-200" : ""}`}
                />
                <input
                    id="todo__value__input"
                    type={"text"}
                    placeholder="name"
                    {...register("name", { required: true })}
                    className={` p-3 focus:outline-0 w-1/2 focus:bg-indigo-100 border ${errors.value ? "border-red-500 bg-red-200 focus:bg-red-200" : ""}`}
                />
                <select
                    {...register("category", { required: true })}
                    className={`border-l-2 w-1/3 focus:outline-none focus:bg-indigo-100 ${errors.category ? "border-red-500 bg-red-200 focus:bg-red-200" : ""}`}>
                    <option value="" selected disabled hidden>
                        Category
                    </option>
                    {categories?.map((category) => (
                        <option value={category}>{category}</option>
                    ))}
                </select>
                <button type="submit" className="text-white py-2 w-1/3 px-3 bg-indigo-700 ">
                    Add
                </button>
            </div>
        </form>
    );
};

export default React.memo(TodoForm);
