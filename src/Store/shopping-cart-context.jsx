import {createContext} from 'react';
import { useState } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext=createContext({
    items:[],
    addItemToCart:()=>{},
    updateCartQuantity:()=>{}
});
const CartContextProvider=({children})=>{
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    
      function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === id);
            updatedItems.push({
              id: id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === productId
          );
    //amount can be positive to increase the quantity or negative to decrease the quantity.
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    //it creates the copy of the item (whose quantity is to be increased).
          updatedItem.quantity += amount;
    //then,it adds the quantity to the quantity property of of 'updateditem'.
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } //if quantity is 0 or less,that means the item should be removed from the cart.using slice method
          else {
            updatedItems[updatedItemIndex] = updatedItem;
          }//if quantity is greater than 0 ,it updates the quantity of updateditem.
    
          return {
            items: updatedItems,
          };
        });//finally it returns an object containing the updated 'items' array.this object will be used as the new state for the shopping cart.
      }
    const ctxValue={
      items:shoppingCart.items,
      addItemToCart:handleAddItemToCart,
      updateCartQuantity:handleUpdateCartItemQuantity
    }
    return(
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;