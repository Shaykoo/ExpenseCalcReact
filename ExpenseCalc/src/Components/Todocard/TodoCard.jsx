import { InlineIcon } from "@iconify/react";
import React from "react";
import { todoChart } from "../../Pages/Todo/TodoChart";

const TodoCard = ({ data, todos, setTodos, setForUpdate }) => {
    
    const deleteTodo = (id) => {
        const filteredData = todos.filter((data) => data.id !== id);
        localStorage.setItem("todos", JSON.stringify(filteredData));
        setTodos(filteredData);
        todoChart.config.data.datasets[0].data = filteredData.map(item => parseInt(item.value))
        todoChart.config.data.labels = filteredData.map(item => item.date)
        todoChart.update()
    };

    return (
        <>
            <div className="w-full list_card">
                <div className=" flex items-center gap-x-2 justify-between list-card bg-indigo-700 text-slate-300 p-3 sm:w-11/12 mx-auto rounded-lg">
                    <div>
                        <h3 className="text-md text-left mb-1 flex items-center gap-x-3"><span title="number">{data?.value}</span> <span className="w-11 h-[2px] border border-dashed"></span> <span title="name">{data?.name}</span></h3>
                        <p className="text-xs">{data?.category} <span className="ml-4">{data?.date}</span></p>
                    </div>
                    <div className="flex gap-2">
                        <div onClick={() => setForUpdate(data)} className="todo__item-btn">
                            <InlineIcon className="text-3xl" icon="akar-icons:edit" />
                        </div>
                        <div onClick={() => deleteTodo(data?.id)} className="todo__item-btn">
                            <InlineIcon className="text-3xl" icon="ic:round-delete-forever" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoCard;
