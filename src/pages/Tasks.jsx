import { useEffect, useReducer, useState } from "react";

const initialState = []
const init = () => {
    
const savedTasks = localStorage.getItem("my_tasks")
return savedTasks ? JSON.parse(savedTasks) : []
}



function reducer (state, action){
    switch(action.type){
        case "Add_Task": {
        return [...state, {id: Date.now(), completed : false, text :action.payload, isEditing: false}]
        }
        case "Delete_Task": {
            return state.filter((task)=> task.id !== action.payload)
                }
        case 'Toggle_Task':{
            return state.map((task) => 
                task.id === action.payload
                 ?  {...task, completed: !task.completed }
                 : task            
            )}

        case "ToggleEdit_Task": {
            return  state.map((task) => 
            task.id === action.payload
        ? {...task, isEditing: !task.isEditing} : task 
    )}
        case "Update_Task": {
            return state.map((task) =>
                task.id === action.payload.id
            ? {...task, text: action.payload.newText, isEditing: false} : task


        )}
        default: 
        return state

    }
} 

export default function Tasks () {


    

    const [text, setText] = useState("")

    
    const [state, dispatch ] = useReducer(reducer, initialState, init)

    useEffect(() => {
        localStorage.setItem("my_tasks", JSON.stringify(state))
        console.log("Saved to Local Storage")
    }, [state])


    const handleAdd = () => {
        if(text.trim() === "") return;
        dispatch({type: "Add_Task", payload: text})
        setText("")
    }
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 h-fit">
                <div>


            <input 
            className=" transition-all duration-300
            border-purple hover:border-purple-600 
        hover:bg-transparent border-2 border-purple-30 rounded-lg px-6 py-2 "
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your new task"
            />
            <button 
            className="mt-10 active:scale-95 hover:scale-105 hover:bg-purple-500 transition-all duration-200 ease-in-out items-center justify-center gap-2 mx-10 px-6 py-2 bg-purple-400 text-white rounded-lg shadow-lg"
            onClick={handleAdd}>ADD TASK</button>


            <ul  className="mt-8 space-y-3  w-full ">
                {state.map((task) =>  ( 
                    <div key={task.id} className="flex items-center gap-4 p-2 border-b">
                            {task.isEditing ? 
                            (
                                <>
                                <input 
                                className="flex-1 pr-10"
                                defaultValue={task.text}
                                autoFocus
                                onBlur={(e) => {
                                    const val = e.target.value.trim();
                                    if (val.length > 0) {
                                    dispatch({ 
                        type: "Update_Task", 
                        payload: { id: task.id, newText: e.target.value } 
                    }) }else{
                        dispatch({type: "ToggleEdit_Task", payload: task.id})
                    }  }}
                                />
                            <button 
                            className=" transtition-all duration-300 hover:bg-green-600 hover:scale-105 active:scale-95 easy-in-out  bg-green-500 rounded-lg px-10 text-white"
                            onMouseDown={(e) => {e.preventDefault();
                            const inputElement = e.currentTarget.previousSibling; 
                            const newText = inputElement.value

                            newText.trim().length > 0 ? 
                                dispatch({type:"Update_Task", payload:  { id: task.id, newText: newText } })
                                :  error;
                            }}>
                                Save
                                </button>
                                </>
                            ) : ( 
                                < >
                                
                                <span className={`flex-1  truncate text-lg transition-all duration-300 ${task.completed ? "line-through text-gray-400 italic" : "text-gray-700 font-medium"}`}>
                                    {task.text} 
                                </span>
                                {task.completed && (
                                    <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold">
                                        Completed
                                    </span>
                                )}
                               
                                <button 
                                className="bg-blue-500 text-white rounded-lg px-5 transition-all hover:bg-blue-600 hover:scale-105"
                                onMouseDown={(e) =>{ e.preventDefault(); dispatch({type: "ToggleEdit_Task", payload: task.id})}}
                                >Edit
                                </button>
                                </>
                            )
                        }
                        <button 
                        className="bg-red-500 transition-all text-white rounded-lg px-2 hover:bg-red-600 hover:scale-105"
                        onClick= {() => dispatch({type: "Delete_Task", payload: task.id})}>Delete Task</button>
                        <input 
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => dispatch({type: "Toggle_Task", payload: task.id})}
                        className="w-5 h-5 accent-purple-500 cursor-pointer transition-transform active:scale-90"
                        />
                        </div>
                ))}
            </ul>
        </div>
        </div>
        </div>
    )
}