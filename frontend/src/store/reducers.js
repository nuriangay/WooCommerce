import { combineReducers } from "@reduxjs/toolkit";

import authReducer from './auth/slice'
import cartReducer from "./cart/slice";
import shippingReducer from './shipping/slice'

const reducers=combineReducers({
    auth:authReducer,
    cart:cartReducer,
    shipping:shippingReducer
})

export default reducers