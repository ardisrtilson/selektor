import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "../sample/SampleProvider"
import { Sample } from "./Friend"

export const FriendsList = () => {
    const {customers, getCustomers, getUserFriends} = useContext(SampleContext)
    const withoutYou = customers.filter(customer => customer.id != parseInt(localStorage.getItem("customer")))

    useEffect(() => {
        getUserFriends()
        getCustomers()
    }, [])

    return (
        <>
        <div class="heading"><h1>Add/Remove Friends</h1></div>
        <article className="friends">
                    {
                        withoutYou.map(sample => {
                            return <Sample key={sample.id} sample={sample} />
                        })
                    }
                </article> 
                </>
    )
}
