import React, { useRef, useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"

export const SampleDetails = (props) => {

    const { releaseSample, getSampleById, customers, getCustomers, addComment, getComments, commentValue} = useContext(SampleContext)
    const [sample, setSample] = useState({})
    const customerName = customers.find(customer => customer.id === sample.customerId) || {}
    const currentUserName = customers.find(customer => customer.id === parseInt(localStorage.getItem("customer"))) || {}
    const theseComments = commentValue.filter(comment => sample.id === comment.sampleId)
    const userComment = useRef(null)
    const addCommentToApi = () => {
        addComment({
            sampleId: sample.id,
            userId: parseInt(localStorage.getItem("customer")),
            comment: userComment.current.value
        })
    }
    useEffect(() => {
        getCustomers()
        getComments()
        const sampleId = parseInt(props.match.params.sampleId)
        getSampleById(sampleId)
            .then(setSample)
    }, [commentValue])

    return (
        <section className="sample">
            <h3 className="sample__name">{sample.name}</h3>
            <div className="sample__description">{sample.description}</div>
            <div className="sample__submitter">{customerName.name}</div>
            <button onClick={() => releaseSample(sample.id).then(() => props.history.push("/browse"))} >Delete Sample</button>
            <input type="text" ref={userComment} id="sampleName" required autoFocus className="form-control" placeholder="Enter Comment" />
            <button onClick={addCommentToApi}>Add Comment</button>
            <div className="sample__submitter">{
                    theseComments.map(comment => {
                    return <><div>{currentUserName.name}</div>
                    <div>{comment.comment}</div></>
                    })}</div>
        </section>
    )
}