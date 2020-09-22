import { SampleContext } from "./SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext} from "react"
import "./Samples.css"

export const Sample = ({sample}) => {

  const { customers, addFavorites} = useContext(SampleContext)

  const customerName = customers.find(customer => customer.id === sample.customerId) || {}

    let audio = new Audio(sample.url)

        const start = () => {
          audio.play()
        }
        const downloadFile = () => {
          window.location.href = sample.url
        }
        const addSampleToFavorites = () => {
          addFavorites({
            customerId: parseInt(localStorage.getItem("customer")),
            sampleId: sample.id
        })
        }

return (
<section className="sample">
  <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
    <div>Description: {sample.description}</div>
    <div className="sample__submitter">Submitted by: {customerName.name}</div>
      <div>
        <button onClick={start}>Try</button>
        <button onClick={addSampleToFavorites}>Favorite</button>
        <button onClick={downloadFile}>Download</button>
      </div >
</section>
)
  
}