import React from "react";
import { useForm } from "react-hook-form";
import { todoChart } from "../../Pages/Todo/TodoChart";
import { categories } from "../../Pages/Todo/TodoForm";

const UpdateModal = ({ data, setTodos, todos, setForUpdate }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    console.log(data)

    const updateTodoData = (formData) => {
        const updatedData = todos?.filter((item) => item?.id !== data?.id);
        setTodos([formData,...updatedData ]);
        formData.id = data.id;
        formData.date = new Date(Date.now()).toLocaleString().split(",")[0];
        localStorage.setItem("todos", JSON.stringify([formData,...updatedData]));
        setForUpdate({});
        todoChart.config.data.labels = [formData,...updatedData].map(item => item.date)
        todoChart.config.data.datasets[0].data = [formData, ...updatedData].map((item) => parseInt(item?.value));
        todoChart.update()
    };

    return (
        <div className="fixed px-2 left-0 top-0 justify-center w-screen h-screen bg-black bg-opacity-50 items-center flex z-[999]">
            <div className="card  w-full shadow-2xl shadow-indigo-500/30  sm:w-8/12 md:w-5/12 lg:w-4/12 bg-indigo-500 rounded-2xl">
                <form className="p-3 px-5" onSubmit={handleSubmit(updateTodoData)}>
                    <div className="flex flex-wrap justify-center gap-y-2 py-5">
                        <input type={"number"}
                            placeholder="number"
                            defaultValue={data?.value}
                            {...register("value", { required: true })}
                            className={` focus:border-0 p-3  w-full  focus:outline-0 ${errors.value ? "border-red-500 bg-red-200 focus:bg-red-200" : ""}   focus:bg-indigo-100 border`}
                        />
                        <input type={"text"}
                            defaultValue={data?.name}
                            placeholder="name"
                            {...register("name", { required: true })}
                            className={` focus:border-0 p-3 w-2/3 focus:outline-0 ${errors.value ? "border-red-500 bg-red-200 focus:bg-red-200" : ""}  focus:bg-indigo-100 border`}
                        />
                        <select
                            {...register("category", { required: true })}
                            defaultValue={data?.category}
                            className={`border-l-2 w-2/6 focus:outline-none focus:bg-indigo-100 ${errors.category ? "border-red-500 bg-red-200" : ""}`}>
                            {categories?.map(item => <option value={item} selected={item === data?.category?true:false} >{item} </option>)}
                        </select>
                        <button type="submit" className="w-2/6 mr-3 py-2 px-3 bg-indigo-800 text-white shadow-lg shadow-indigo-800/50 rounded-full mt-5">
                            update
                        </button>
                        <button onClick={()=>setForUpdate({}) } className="w-2/6 py-2 px-3 bg-red-800 text-white shadow-lg shadow-indigo-800/50 rounded-full mt-5">
                            cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
