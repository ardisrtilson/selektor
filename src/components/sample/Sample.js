import React, {useContext} from "react"
import "./Samples.css"
import { Link } from "react-router-dom"
import { SampleContext } from "./SampleProvider"

export const Sample = ({sample}) => {
    const { customers } = useContext(SampleContext)
    const customerName = customers.find(customer => customer.id === sample.customerId) || {}
            return <section className="sample">
                <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
                <div>Description: {sample.description}</div>
                <div className="sample__submitter">Submitted by: {customerName.name}</div>
            </section>
        }