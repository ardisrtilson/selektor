import React, { useState } from "react"

export const SampleContext = React.createContext()

export const SampleProvider = (props) => {
    const [samples, setSamples] = useState([])
    const [customers, setCustomers] = useState([])
    const [userFriends, setUserFriends] = useState([])
    const [filterValue, setFilter] = useState([])
    const [ratingValue, setRating] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getSamples = () => {
        return fetch("http://localhost:8088/samples")
            .then(res => res.json())
            .then(setSamples)
    }

    const getSampleById = (id) => {
        return fetch(`http://localhost:8088/samples/${id}`)
            .then(res => res.json())
    }

    const addSample = sample => {
        return fetch("http://localhost:8088/samples", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sample)
        })
            .then(getSamples)
    }

    const updateSample = sample => {
        return fetch(`http://localhost:8088/samples/${sample.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sample)
        })
            .then(getSamples)
    }

    const releaseSample = (sampleId) => {
        return fetch(`http://localhost:8088/samples/${sampleId}`, {
            method: "DELETE"
        })
            .then(getSamples)
    }

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers")
            .then(res => res.json())
            .then(setCustomers)
    }

    const addUserFriends = customer => {
        return fetch("http://localhost:8088/userFriends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(getSamples)
    }

    const getUserFriends = () => {
        return fetch("http://localhost:8088/userFriends")
            .then(res => res.json())
            .then(setUserFriends)
    }
    
    const releaseUserFriends = (relationshipId) => {
        return fetch(`http://localhost:8088/userFriends/${relationshipId}`, {
            method: "DELETE"
        })
            .then(getSamples)
    }

    return (
        <SampleContext.Provider value={{
            samples, addSample, getSamples, getSampleById,
            searchTerms, setTerms, setFilter, filterValue, releaseSample, updateSample,
            getCustomers, customers, addUserFriends, getUserFriends, 
            releaseUserFriends, userFriends, ratingValue, setRating
        }}>
            {props.children}
        </SampleContext.Provider>
    )
}