import React, { useContext, useRef, useEffect } from "react"
import "../sample/Samples.css"
import { Link } from "react-router-dom"
import { SampleContext } from "../sample/SampleProvider"

export const Sample = ({sample}) => {
    const addFriend = () => {
        addUserFriends({
            userId: parseInt(localStorage.getItem("customer")),
            friendId: sample.id
        })
    }
    const removeFriend = () => {
        releaseUserFriends(sample.id)
    }

    const { customers, userFriends, getUserFriends, addUserFriends, releaseUserFriends} = useContext(SampleContext)
    const customerName = customers.find(customer => customer.id === sample.customerId) || {}
    useEffect(() => {
        getUserFriends()
    }, [])
            return <section className="sample">

                <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
      <button onClick={addFriend}>Add Friend</button>
      <button onClick={removeFriend}>Remove Friend</button>
            </section>
            
        }