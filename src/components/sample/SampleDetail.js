// Organized
import React, { useRef, useContext, useEffect, useState } from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"

export const SampleDetails = (props) => {

    const {addComment,
          commentValue,
          customers, 
          getComments,
          getCustomers,
          getSampleById,
          releaseComment,
          releaseSample
          } = useContext(SampleContext)

        const [sample, setSample] = useState({})
    
            const customerName = customers.find(customer => customer.id === sample.customerId) || {}
            const theseComments = commentValue.filter(comment => sample.id === comment.sampleId)
            const userComment = useRef(null)
            const isUser = sample.customerId === parseInt(localStorage.getItem("customer"))
            const foundUser = customers.find(customer => customer.id === parseInt(localStorage.getItem("customer"))) || {}
            const currentUserName = foundUser.name
    
        const addCommentToApi = () => {
            let commenterName = customers.find(customer => customer.id === parseInt(localStorage.getItem("customer")))
            addComment({
                sampleId: sample.id,
                userId: commenterName.name,
                comment: userComment.current.value
            }).then(getComments)
            userComment.current.value = ""
        }

    useEffect(() => {
        getCustomers()
        getComments()
        const sampleId = parseInt(props.match.params.sampleId)
        getSampleById(sampleId)
            .then(setSample)
    }, [])

        if (isUser === true){
        return (
            <section className="sample">
                <h3 className="sample__name">{sample.name}</h3>
                <div className="sample__description">{sample.description}</div>
                <div className="sample__submitter">{customerName.name}</div>
                <input type="text" ref={userComment} id="sampleName" required autoFocus className="form-control" placeholder="Enter Comment" />
                <button onClick={addCommentToApi}>Add Comment</button>
                <button onClick={() => releaseSample(sample.id).then(() => props.history.push("/browse"))} >Delete Sample</button>
                <div className="comment_card">{
                        theseComments.map(comment => {
                        if (currentUserName === comment.userId){
                        return <><div>{comment.userId}</div>
                        <div>{comment.comment}</div>
                        <button onClick={() => releaseComment(comment.id)}>Delete Comment</button></>
                        }
                        else {
                            return <><div>{comment.userId}</div>
                            <div>{comment.comment}</div></>
                            }
                        })}
                </div>
            </section>
        )} 
        else{
            return (
                <section className="sample">
                    <h3 className="sample__name">{sample.name}</h3>
                    <div className="sample__description">{sample.description}</div>
                    <div className="sample__submitter">{customerName.name}</div>
                    <input type="text" ref={userComment} id="sampleName" required autoFocus className="form-control" placeholder="Enter Comment" />
                    <button onClick={addCommentToApi}>Add Comment</button>
                    <div className="sample__submitter">{
                        theseComments.map(comment => {
                        if (currentUserName === comment.userId){
                        return <><div>{comment.userId}</div>
                        <div>{comment.comment}</div>
                        <button onClick={() => releaseComment(comment.id)}>Delete Comment</button></>
                        }
                        else {
                            return <><div>{comment.userId}</div>
                            <div>{comment.comment}</div></>
                            }
                        })}
                </div>
                </section>
        )}
    }