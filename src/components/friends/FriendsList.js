import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import { Sample } from "./Friend"

export const FriendsList = (props) => {
    const {customers, getCustomers, getUserFriends} = useContext(SampleContext)
    const withoutYou = customers.filter(customer => customer.id != parseInt(localStorage.getItem("customer")))

    useEffect(() => {
        getUserFriends()
        getCustomers()
    }, [])

    return (
        <article className="samples">
            <div className="samples">
                    {
                        withoutYou.map(sample => {
                            return <Sample key={sample.id} sample={sample} />
                        })
                    }
                </div>
                </article> 
    )
}
