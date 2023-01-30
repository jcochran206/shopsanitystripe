import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ childern }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1);

    return (
        <Context.Provider
            value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty
            }}
        >
            {childern}
        </Context.Provider>
    )
}