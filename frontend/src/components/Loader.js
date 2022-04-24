import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
        <Spinner style={{ width:100,
                          height:100, }} animation= "border"/>
            
        </div>
    )
}

export default Loader
