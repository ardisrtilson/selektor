import React, {useContext} from "react"
import "./Samples.css"
import "./StarRating.css"
import { Link } from "react-router-dom"
import { SampleContext } from "./SampleProvider"

export const Sample = ({sample}) => {
        let audio = new Audio(sample.url)
        const start = () => {
          audio.play()
        }

            const downloadFile = () => {
              window.location.href = sample.url
            }

    const { customers } = useContext(SampleContext)
    const customerName = customers.find(customer => customer.id === sample.customerId) || {}
            return <section className="sample">

                <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
                <div>Description: {sample.description}</div>
                <div className="sample__submitter">Submitted by: {customerName.name}</div>
                < div >
      <button onClick={start}>Try it!</button>
      <button onClick={downloadFile}>Favorite</button>
      <button onClick={downloadFile}>Download it!</button>
       <div class="rate">
          <input type="radio" id="star5" name="rate" value="5" />
          <label for="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value="4" />
          <label for="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value="3" />
          <label for="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value="2" />
          <label for="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value="1" />
          <label for="star1" title="text">1 star</label>
       </div>
    </div >
            </section>
            
        }