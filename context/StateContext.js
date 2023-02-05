import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';

const Context = React.createContext();

export const StateContext = ({ children }) => {
    //state items
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    //onAdd function to add to cart
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        //set total price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        //set total quantities
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart){

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                     ...cartProduct,
                     quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            //updated quantity
            product.quantity = quantity;
            //set cart items 
            setCartItems([...cartItems, {...product}]);
        }
        //toast message
        toast.success(`${qty} ${product.name} added to the cart.`);
    }
    
    //increase amount
    const incQty = () =>{
        setQty((prevQty) => prevQty + 1);
    }
    //decrese amount in cart
    const decQty = () =>{
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1; 
        });
    }

    return (
        <Context.Provider
            value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);