import { useReducer } from "react";

const useStateCustom = (initialValue) => {
    const reducer = (state, action) => {
        if (typeof action === "function") {
            return action(state);
         } // Если action - функция, вызываем её с текущим состоянием
        return action;  

    const [state, dispatch] = useReducer(reducer, initialValue);

    const setState = (newValue) => {
            dispatch(newValue); // Иначе просто диспатчим новое значение
        } 
    };

    return [state, setState];
};

export const CustomCount = () => {
    const [count, setCount] = useStateCustom(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button> 
            <button onClick={() => setCount((prev) => prev + 1)}>Increment with function</button>
        </div>
    );
};