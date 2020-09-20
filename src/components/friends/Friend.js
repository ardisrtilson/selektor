import React, { useContext, useEffect } from "react"
import "../sample/Samples.css"
import { Link } from "react-router-dom"
import { SampleContext } from "../sample/SampleProvider"

export const Sample = ({sample}) => {
    const {getUserFriends, addUserFriends, releaseUserFriends, userFriends, setUserFriends} = useContext(SampleContext)
    const currentUser = parseInt(localStorage.getItem("customer"))
    let foundFriend = userFriends.find(friend => friend.friendId === sample.id)
    if (foundFriend === undefined) {foundFriend = false}
    const isFriends = foundFriend.userId === currentUser
    const addFriend = () => {
        addUserFriends({
            userId: parseInt(localStorage.getItem("customer")),
            friendId: sample.id
        }).then(getUserFriends)
    }
    const removeFriend = () => {
        releaseUserFriends(foundFriend.id).then(getUserFriends)
    }

    useEffect(() => {
        getUserFriends()
    }, [])

        if (isFriends){
            return <section className="sample">

                <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
                <button onClick={removeFriend}>Remove Friend</button>
            </section>
    }
    else{
        return <section className="sample">

        <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
<button onClick={addFriend}>Add Friend</button>
    </section>
    }}