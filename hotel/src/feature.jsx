import React from 'react'
import useFetch from './usefetch'

function Feature() {
    const {data}=useFetch(`http://127.0.0.1:7000/booking/query?city=madrid,london`,'GET')
  return (
    <div>Feature</div>
  )
}

export default Feature