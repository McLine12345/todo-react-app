import { useReducer } from "react";
const initialState = {
    items: [],
    totalAmount: 0,
    totalItems: 0,    
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            let updatedItems;
            if (existingItemIndex >= 0) {
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = 
                    {...updatedItems[existingItemIndex], 
                    quantity: updatedItems[existingItemIndex].quantity + 1};
            }
            else {
                updatedItems = [...state.items, {...action.payload, quantity: 1}];
            }
            return { 
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount + action.payload.price,
                totalItems: state.totalItems + 1,
            };
    }
}

export const ShoppingCart = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const addItemToCart = (item) => {
        dispatch({ type: "ADD_ITEM", payload: item });
    }
    return (
        <div>
            <h2>Shopping Cart</h2>
            <p>Total Items: {fstate.totalItems}</p>
            <p>Total Amount: ${state.totalAmount.toFixed(2)}</p>
            <ul>
                {state.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>      
        <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
            Add Item
        </button>
    </div>
    )
}