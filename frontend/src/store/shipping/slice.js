import { createSlice } from "@reduxjs/toolkit";


const initialState={
    shippingDetails:null,
    
}


const shippingSlice=createSlice({
    name:'shipping',
    initialState,
    reducers:{
        saveShippingDetails(state,action){
            state.shippingDetails=action.payload

            localStorage.setItem('shipping',JSON.stringify(action.payload))
            
        }
    }
})

export const {saveShippingDetails}=shippingSlice.actions

export default shippingSlice.reducer