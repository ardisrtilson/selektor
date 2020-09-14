import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import { Sample } from "./Sample"

export const SampleList = (props) => {

    const {samples, getSamples, searchTerms} = useContext(SampleContext)
    const [ filteredSamples, setFiltered ] = useState([])

    useEffect(() => {
        getSamples()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = samples.filter(sample => sample.name.toLowerCase().includes(searchTerms))
            setFiltered(subset)
        } else {
            setFiltered(samples)
        }
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