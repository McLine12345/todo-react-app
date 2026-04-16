import { useReducer } from "react";

const initialState = 0;

function reducer (state, action) {
    switch(action.type){
        case "increase":
            return state + 1;
    }
}
export default function Hello () {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <button onClick={()=>{
                dispatch( {type: "increase"})
            }}>Increase</button>
        </div>
    )
}