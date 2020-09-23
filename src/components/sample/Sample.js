import { SampleContext } from "./SampleProvider"
import { Link } from "react-router-dom"
import React, {useContext} from "react"
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
<section class="sampleCard">
  <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
    <div class="description">{customerName.name}</div>
    <div class="description">{sample.description}</div>
    <div class="button_card">
        <button class="button1" onClick={start}>Try</button>
        <button class="button5" onClick={removeFavorite}>Remove</button>
        <button class="button3" onClick={downloadFile}>Download</button>
        </div>
</section>
)}

else{
return (
  <section class="sampleCard">
  <div class="link_card button4"><Link to={`/browse/${sample.id}`}>{sample.name}</Link></div>
    <div class="description"> {customerName.name}</div>
    <div class="description">{sample.description}</div>
    <div class="button_card">
        <button class="button1" onClick={start}>Try</button>
        <button class="button2" onClick={addSampleToFavorites}>Favorite</button>
        <button class="button3" onClick={downloadFile}>Download</button>
        </div>
  </section>
  )}
    
}