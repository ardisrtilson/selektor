import { SampleContext } from "./SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext, useEffect} from "react"
import "./Samples.css"

export const Sample = ({sample}) => {

  const { customers, addFavorites, favorites, releaseFavorite, getFavorites} = useContext(SampleContext)
  const currentUser = parseInt(localStorage.getItem("customer"))
  let thisUserFavorites = favorites.filter(faves => faves.customerId === currentUser)
  let foundFave = thisUserFavorites.find(fave => fave.sampleId === sample.id)
  if (foundFave === undefined) {foundFave= false}
  let isFavorite = foundFave.customerId === currentUser
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
        const removeFavorite = () => {
          releaseFavorite(foundFave.id).then(getFavorites)
        }

if (isFavorite){
return (
<section className="sample">
  <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
    <div>Description: {sample.description}</div>
    <div className="sample__submitter">Submitted by: {customerName.name}</div>
      <div>
        <button onClick={start}>Try</button>
        <button onClick={removeFavorite}>Remove Fave</button>
        <button onClick={downloadFile}>Download</button>
      </div >
</section>
)}

else{
return (
  <section className="sample">
    <h3><Link to={`/browse/${sample.id}`}>{sample.name}</Link></h3>
      <div>Description: {sample.description}</div>
      <div className="sample__submitter">Submitted by: {customerName.name}</div>
        <div>
          <button onClick={start}>Try</button>
          <button onClick={addSampleToFavorites}>Add Fave</button>
          <button onClick={downloadFile}>Download</button>
        </div >
  </section>
  )}
    
}