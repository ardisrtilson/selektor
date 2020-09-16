import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"


export const SampleList = (props) => {
    console.log(localStorage)
    const {samples, getSamples, searchTerms, getCustomers} = useContext(SampleContext)
    const [ filteredSamples, setFiltered ] = useState([])


    useEffect(() => {
        getSamples()
        getCustomers()
    }, [])

    useEffect(() => {
        let samplesToDisplay = samples
        if (props.history.location.pathname === "/"){
         samplesToDisplay = samples.filter(byUser => byUser.customerId === parseInt(localStorage.kennel_customer))
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