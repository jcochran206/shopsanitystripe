import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ childern }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const incrementQty = () =>{
        setQty((prevQty) => prevQty +1)
    }

    const decreaseQty = () =>{
        setQty((prevQty) => {
            if(prevQty - 1 < 1){
                return 1;
            }
            return prevQty - 1; 
        })
    }

    return (
        <Context.Provider
            value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incrementQty,
            decreaseQty,
            }}
        >
            {childern}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);