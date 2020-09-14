import React from "react"
import "./Samples.css"
import { Link } from "react-router-dom"

export const Sample = ({sample}) => {
            return <section className="sample">
                <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
                <div>{sample.description}</div>
            </section>
        }