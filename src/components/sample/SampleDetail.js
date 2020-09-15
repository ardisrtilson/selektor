import React, { useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"


export const SampleDetails = (props) => {
    const { releaseSample, getSampleById } = useContext(SampleContext)

    const [sample, setSample] = useState({})

    useEffect(() => {
        const sampleId = parseInt(props.match.params.sampleId)
        getSampleById(sampleId)
            .then(setSample)
    }, [])

    return (
        <section className="sample">
            <h3 className="sample__name">{sample.name}</h3>
            <div className="sample__description">{sample.description}</div>
            <div className="sample__submitter">{sample.customerId}</div>

            <button onClick={() => releaseSample(sample.id).then(() => props.history.push("/browse"))} >Delete Sample</button>

            <button onClick={() => {
                props.history.push(`/browse/edit/${sample.id}`)
            }}>Edit</button>
        </section>
    )
}