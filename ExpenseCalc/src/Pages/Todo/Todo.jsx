import { InlineIcon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import TodoCard from "../../Components/Todocard/TodoCard";
import UpdateModal from "../../Components/UpdateModal/UpdateModal";
import TodoChart from "./TodoChart";
import TodoForm from "./TodoForm";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [forUpdate, setForUpdate] = useState({});
    const [total, setTotal] = useState("0.00");

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("todos"));
        setTodos(localData?localData:[]);
    }, []);

    useEffect(()=> {

        let sum = 0;
        todos?.forEach((todo) => {
            sum = sum + parseInt(todo?.value)
        });
        setTotal(sum)

    },[todos,setTodos])

    return (
        <section className="w-100 min-h-screen bg-slate-200 flex px-2   py-10 items-center justify-center">
            <div className="todo-body h-full min-h-[500px] w-full lg:w-6/12 sm:w-9/12 md:w-7/12 bg-indigo-500 rounded-2xl">
                <TodoForm todos={todos} setTodos={setTodos} />

                <div className="allList min-h-[400px] p-3 space-y-4 mt-5">

                    <TodoChart todos={todos}></TodoChart>
                    {todos?.map((data, index) => (
                        <TodoCard setForUpdate={setForUpdate} todos={todos} setTodos={setTodos} data={data} />
                    ))}

                </div>
                <div className="w-full box-border pr-5 pb-4 text-right">
                    <h4 className="text-xl text-white">Total: {total}</h4>
                </div>

                {Object.keys(forUpdate).length > 0 ? <UpdateModal todos={todos} setTodos={setTodos} data={forUpdate} setForUpdate={setForUpdate} /> : null}
            </div>
        </section>
    );
};

export default Todo;
