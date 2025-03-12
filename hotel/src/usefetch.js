import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useFetch(url, method, data) {
    const [info, setInfo] = useState([])
    useEffect(() => {
        
        const request = async function () {
            try{
            const res = await axios({
                url,
                method,
                data
            })
            setInfo(res.data)
        }
        catch (error){
            console.log(error)
        }
        }
        request()
    }, [url,method,data]
)
    return {data}
}

export default useFetch