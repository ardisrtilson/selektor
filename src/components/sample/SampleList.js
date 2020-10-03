// Organized
import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"
import "./Samples.css"
export const SampleList = (props) => {

    const {favorites, 
        filterValue, 
        getCustomers,
        getFavorites,
        getSamples,
        getUserFriends, 
        samples, 
        searchTerms,
        setFilter,
        userFriends,
           } = useContext(SampleContext)
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
        getFavorites()
        setFilter("0")
    }, [])
    useEffect(() => {
        let samplesToDisplay = samples
        let allUserFriends = findFriends()
        let currentlyFiltered = samples

            if (props.history.location.pathname === "/"){
            samplesToDisplay = currentlyFiltered.filter(byUser => byUser.customerId === parseInt(localStorage.customer))
            currentlyFiltered = samplesToDisplay
            }

            if (props.history.location.pathname === "/browse"){
                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                samplesToDisplay = notUser
                currentlyFiltered = samplesToDisplay
                }

            if (searchTerms !== "") {
                samplesToDisplay = currentlyFiltered.filter(sample => sample.name.toLowerCase().includes(searchTerms))
                currentlyFiltered = samplesToDisplay
            }

            if (filterValue === "1" && props.history.location.pathname === "/browse"){
                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                samplesToDisplay = notUser.filter(byFriend => allUserFriends.includes(byFriend.customerId))
            }

            if (filterValue === "2" && props.history.location.pathname === "/browse"){
                const notUser = currentlyFiltered.filter(byUser => byUser.customerId != parseInt(localStorage.customer))
                const userFaves = favorites.filter(faves => faves.customerId === parseInt(localStorage.customer))
                samplesToDisplay = notUser.filter(currentSamples => 
                    {return userFaves.some(favorite => 
                        favorite.sampleId === currentSamples.id)})
            }
   
    setFiltered(samplesToDisplay)
    }, [searchTerms, samples, filterValue])

        return (
            <>
            <div className="samples">
                <div class="sampleCard">
                        </div> 
                {
                    filteredSamples.map(sample => {
                        return <Sample key={sample.id} sample={sample} />
                    })
                }
            </div> 
            </>
        )
}