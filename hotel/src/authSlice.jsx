import {createSlice} from '@reduxjs/toolkit'

const initialState={
status:false,
isLoading:false,
userinfo:localStorage.getItem(`Token`) ? JSON.parse(localStorage.getItem('Token')) : null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        LoginUser(state,action){
            state.status=true
            state.isLoading=true
            state.userinfo=action.payload
            localStorage.setItem('Token',JSON.stringify(action.payload))
        },

        LogOut(state,action){
           state.status=false,
           state.isLoading=false,
           localStorage.removeItem('Token')
        }
    }
})

export const {LoginUser,LogOut}=authSlice.actions
export default authSlice.reducer