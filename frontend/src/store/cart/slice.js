import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'

const initialState={
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0
}


const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){

         const itemIndex = state.cartItems.findIndex(item=>item._id===action.payload._id)
           if(itemIndex>=0){
                state.cartItems[itemIndex].cartQuantity +=1
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
                toast('Product quantity increased successfully')
             
           }else{
            const tempProduct={...action.payload,cartQuantity:1}
            state.cartItems.push(tempProduct)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            toast('Product added to cart successfully')
           }
         
          
        },
        removeFromCart(state,action){

            const removeIndex=state.cartItems.findIndex(item=>item._id===action.payload)

               
            state.cartItems.splice(removeIndex,1)

            const existingItems = JSON.parse(localStorage.getItem('cartItems'))
            
            const itemIndex=existingItems.findIndex(item=>item._id===action.payload)

            existingItems.splice(itemIndex, 1)

        localStorage.setItem('cartItems', JSON.stringify(existingItems));
          
           
        },
        resetCart:(state,action)=>initialState
    }
})

export const {addToCart,removeFromCart,resetCart}=cartSlice.actions

export default cartSlice.reducer