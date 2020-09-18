import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import { Sample } from "./Friend"

export const FriendsList = (props) => {
    const {customers, getCustomers} = useContext(SampleContext)

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <article className="samples">
            <div className="samples">
                    {
                        customers.map(sample => {
                            return <Sample key={sample.id} sample={sample} />
                        })
                    }
                </div>
                </article> 
    )
}
