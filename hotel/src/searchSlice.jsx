import { createSlice } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";

const initialState = {
    destination: sessionStorage.getItem('destination') ? JSON.parse(sessionStorage.getItem('destination')) : null,

    checkIn: sessionStorage.getItem('checkIn') ? new Date(sessionStorage.getItem('checkIn') || new Date().toISOString) : '',
    checkOut: sessionStorage.getItem('checkOut') ? new Date(sessionStorage.getItem('checkOut') || new Date().toISOString): '',

    adultCount: sessionStorage.getItem('adultCount') ? parseInt(sessionStorage.getItem('adultCount')) : 1,

    childCount: sessionStorage.getItem('childCount') ? parseInt(sessionStorage.getItem('childCount')) : 1,

    hotelId: sessionStorage.getItem('hotelId') ? JSON.parse(sessionStorage.getItem('hotelId')) : null,
    stripe:sessionStorage.getItem('stripe_publish') ?JSON.parse(sessionStorage.getItem('stripe_publish')) : null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        DESTINATION(state, action) {
            state.destination = action.payload
            sessionStorage.setItem('destination', JSON.stringify(action.payload))
        },
        CHECKIN(state, action) {
            state.checkIn = action.payload?.toISOString() || new Date().toISOString()
            sessionStorage.setItem('checkIn', action.payload.toISOString() || new Date().toISOString())
        },
        CHECKOUT(state, action) {
            state.checkOut = action.payload?.toISOString() || new Date().toISOString()
            sessionStorage.setItem('checkOut', action.payload.toISOString() || new Date().toISOString() )
        },
        ADULTCOUNT(state,action){
            state.adultCount=action.payload || 1
            sessionStorage.setItem('adultCount',action.payload?.toString() || 1)
        },
        CHILDCOUNT(state,action){
            state.childCount=action.payload || 0
            sessionStorage.setItem('childCount', action.payload?.toString())
        },
        HOTELID(state,action){
            state.hotelId=action.payload
            sessionStorage.setItem('hotelId',action.payload)
        },
        CLEAR(state){
            state.destination=null
            sessionStorage.removeItem('destination')
            state.adultCount=null
            sessionStorage.removeItem('adultCount')
            state.childCount=null
            sessionStorage.removeItem('childCount')
            state.checkIn=null
            sessionStorage.removeItem('checkIn')
            state.checkOut=null
            sessionStorage.removeItem('checkOut')
        },
      
    }
})

export const {DESTINATION,CHECKIN,CHECKOUT,CHILDCOUNT,ADULTCOUNT,HOTELID,CLEAR}=searchSlice.actions

export default searchSlice.reducer