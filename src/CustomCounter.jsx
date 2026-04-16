    import { useReducer } from "react";

    const useStateCustom = (initialvalue) => {
        const [count, setCount] = useState(() => {
            console.log("Init function called");
            return 0;
        });
    // currentvalue, setterFunction = useState(fn)

    console.log("Component rendered:", count);

    const handleClick = () => {
        setCount(count + 1);
    }
    
}
    export const CustomCounter = () => { 
        return <button onClick={handleClick}>Count: {count}</button>
    }