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

    //found product/item 
    let foundProduct;
    let index;

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
    // remove product from cart
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        let newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }   

    //cart item quantities
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.find((product) => product._id === id);
        let newCartItems = cartItems.filter((item) => item._id !== id)

        if(value === 'inc'){
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity +1} ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1} ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
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
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);