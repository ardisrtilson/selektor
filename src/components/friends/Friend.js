import React, { useContext, useEffect } from "react"
import "../sample/Samples.css"
import { Link } from "react-router-dom"
import { SampleContext } from "../sample/SampleProvider"

export const Sample = ({sample}) => {
    const {getUserFriends, addUserFriends, releaseUserFriends, userFriends} = useContext(SampleContext)
    const currentUser = parseInt(localStorage.getItem("customer"))
    let thisUserFriends = userFriends.filter(friends => friends.userId === parseInt(localStorage.getItem("customer")))
    let foundFriend = thisUserFriends.find(friend => friend.friendId === sample.id)
    if (foundFriend === undefined) {foundFriend = false}
    const isFriends = foundFriend.userId === currentUser || foundFriend.friendId === currentUser
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
    }, [isFriends])

    if (isFriends){
            return <section class="friendCard">

                <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
                <button class="button2" onClick={removeFriend}>Add Friend</button>
            </section>
    }
    else{
        return <section class="friendCard">

        <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
        <button class="button5" onClick={addFriend}>Remove Friend</button>
    </section>
    }
}