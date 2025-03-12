import {createSlice} from '@reduxjs/toolkit'

const initialState={
status:false,
isLoading:false,
user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) :null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        LoginUser(state,action){
            state.status=true
            state.isLoading=true
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },

        LogOut(state,action){
           state.status=false,
           state.isLoading=false,
           state.user=null ,
           localStorage.removeItem('user')
        }
    }
})

export const {LoginUser,LogOut}=authSlice.actions
export default authSlice.reducer