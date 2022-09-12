import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";


import authService from "./service";

const user=JSON.parse(localStorage.getItem('user'))

const initialState={
    user:user?user:null,
    loading:false,
    error:false,
    success:false,
    message:''
}

export const register=createAsyncThunk('register',async(userData,thunkAPI)=>{

    try {
        return await authService.register(userData)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)
        || error.message||error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const login=createAsyncThunk('login',async(userData,thunkAPI)=>{
    try {
        return await authService.login(userData)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)
        || error.message||error.toString()

        return thunkAPI.rejectWithValue(message)
        
    }
})

export const authSlice=createSlice({
    name:'auth',
    initialState,reducers:{
        
        reset:(state,action)=>initialState
     
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.loading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.success=true
            state.user=action.payload
            state.message=action.payload.msg
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.success=false
            state.error=true
            state.message=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.error=false
            state.success=true
            state.user=action.payload
            state.message=action.payload.msg
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.success=false
            state.error=true
            state.message=action.payload
        })
    }
})

export const {reset}=authSlice.actions

export default authSlice.reducer