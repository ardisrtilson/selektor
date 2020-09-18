import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"

export const SampleList = (props) => {
    const {samples, getSamples, searchTerms, getCustomers, getUserFriends, userFriends} = useContext(SampleContext)
    const [ filteredSamples, setFiltered ] = useState([])
    const findFriends = () => {
        let currentUserId = parseInt(localStorage.kennel_customer)
        let currentRelationships = userFriends.filter(f => {
            if (currentUserId === f.userId || currentUserId === f.friendId) {
                return f
            }
        })
    
        let friendIds = currentRelationships.map(r => {
            if (r.userId === currentUserId) {
                return r.friendId
            } else {
                return r.userId
            }
        })          
        friendIds.push(currentUserId)
        return friendIds
        // friendsEvents = events.filter(event => friendIds.find(id => event.userId === id))
    
    }

    useEffect(() => {
        getSamples()
        getCustomers()
        getUserFriends()
    }, [])

    useEffect(() => {
        let samplesToDisplay = samples
        if (props.history.location.pathname === "/"){
        samplesToDisplay = samples.filter(byUser => byUser.customerId === parseInt(localStorage.kennel_customer))
        }
        if (props.history.location.pathname === "/browse"){
        let allUserFriends = findFriends()
        const notUser = samples.filter(byUser => byUser.customerId != parseInt(localStorage.kennel_customer))
        samplesToDisplay = notUser
        }
        if (props.history.location.pathname === "/browse/friends"){
            let allUserFriends = findFriends()
            const notUser = samples.filter(byUser => byUser.customerId != parseInt(localStorage.kennel_customer))
            samplesToDisplay = notUser.filter(byFriend => allUserFriends.includes(byFriend.customerId))
            }
        if (searchTerms !== "") {
        samplesToDisplay = samples.filter(sample => sample.name.toLowerCase().includes(searchTerms))
        } 
        setFiltered(samplesToDisplay)
    }, [searchTerms, samples])

    return (
    <article className="samples">
        <div className="samples">
                {
                    filteredSamples.map(sample => {
                        return <Sample key={sample.id} sample={sample} />
                    })
                }
            </div>
            </article> 
        )}