import React, { useContext, useRef, useEffect } from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"

export const SampleForm = (props) => {
    const { addSample } = useContext(SampleContext)
    const name = useRef(null)
    const description = useRef(null)
    const constructNewSample = () => {

            addSample({
                name: name.current.value,
                description: description.current.value,
                customerId: parseInt(localStorage.getItem("kennel_customer"))
            })
            .then(() => props.history.push("/browse"))
        }

    return (
        <form className="sampleForm">
            <h2 className="sampleForm__title">Upload Sample</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="sampleName">Sample Name: </label>
                    <input type="text" id="sampleName" ref={name} required autoFocus className="form-control" placeholder="Sample Name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="sampleName">Description: </label>
                    <input type="text" id="sampleDescription" ref={description} required autoFocus className="form-control" placeholder="Enter Description Here" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewSample()
                }}
                className="btn btn-primary">
                Add Sample
            </button>
        </form>
    )
}