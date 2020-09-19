import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"

export const SampleList = (props) => {

    const {samples, filterValue, getSamples, searchTerms, getCustomers, getUserFriends, userFriends} = useContext(SampleContext)
    const [ filteredSamples, setFiltered ] = useState([])

    const findFriends = () => {
        let currentUserId = parseInt(localStorage.customer)

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
    }

    useEffect(() => {
        getSamples()
        getCustomers()
        getUserFriends()
    }, [])

    useEffect(() => {

        let samplesToDisplay = samples
        let allUserFriends = findFriends()
            if (props.history.location.pathname === "/"){
            samplesToDisplay = samples.filter(byUser => byUser.customerId === parseInt(localStorage.customer))
            }

            if (props.history.location.pathname === "/browse"){
                const notUser = samples.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                samplesToDisplay = notUser
                }

            if (searchTerms !== "") {
                samplesToDisplay = samples.filter(sample => sample.name.toLowerCase().includes(searchTerms))
            }

            if (filterValue === "1"){
                const notUser = samples.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                samplesToDisplay = notUser.filter(byFriend => allUserFriends.includes(byFriend.customerId))
            }

    setFiltered(samplesToDisplay)
    }, [searchTerms, samples, filterValue])

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