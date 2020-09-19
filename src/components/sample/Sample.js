import { SampleContext } from "./SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext} from "react"
import "./Samples.css"

export const Sample = ({sample}) => {
  const { customers, setRating } = useContext(SampleContext)
  const customerName = customers.find(customer => customer.id === sample.customerId) || {}
  let audio = new Audio(sample.url)

        const start = () => {
          audio.play()
        }

        const downloadFile = () => {
          window.location.href = sample.url
        }
    
  return <section className="sample">
    <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
      <div>Description: {sample.description}</div>
      <div className="sample__submitter">Submitted by: {customerName.name}</div>
        <div>
          <button onClick={start}>Try it!</button>
          <button onClick={"Feature Coming Soon"}>Favorite</button>
          <button onClick={downloadFile}>Download it!</button>
            {<div className="rate">
              <input onChange={
                    (changeEvent) => {
                      console.log(changeEvent.target.value)
                        setRating(changeEvent.target.value)
                    }
                } type="radio" id="star5" name="rate" value="5" />
                <label forhtml="star5" title="text">5 stars</label>
              <input onChange={
                    (changeEvent) => {
                      console.log(changeEvent.target.value)
                        setRating(changeEvent.target.value)
                    }
                } type="radio" id="star4" name="rate" value="4" />
                <label forhtml="star4" title="text">4 stars</label>
              <input onChange={
                    (changeEvent) => {
                      console.log(changeEvent.target.value)
                        setRating(changeEvent.target.value)
                    }
                } type="radio" id="star3" name="rate" value="3" />
                <label forhtml="star3" title="text">3 stars</label>
              <input onChange={
                    (changeEvent) => {
                      console.log(changeEvent.target.value)
                        setRating(changeEvent.target.value)
                    }
                } type="radio" id="star2" name="rate" value="2" />
                <label forhtml="star2" title="text">2 stars</label>
              <input onChange={
                    (changeEvent) => {
                      console.log(changeEvent.target.value)
                        setRating(changeEvent.target.value)
                    }
                }
              type="radio" id="star1" name="rate" value="1" />
                <label forhtml="star1" title="text">1 star</label>
          </div>}
        </div >
  </section>
}