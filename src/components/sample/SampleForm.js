// Organized
import React, { useContext, useRef} from "react"
import { SampleContext } from "./SampleProvider"
import "./Samples.css"
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBvcefxE55FTuGU_atOzBriWjYMjBTWSmI",
    authDomain: "selektor-b0fc6.firebaseapp.com",
    databaseURL: "https://selektor-b0fc6.firebaseio.com",
    projectId: "selektor-b0fc6",
    storageBucket: "selektor-b0fc6.appspot.com",
    messagingSenderId: "575613031578",
    appId: "1:575613031578:web:9fbbe8aea6fe7b30593b23",
    measurementId: "G-17ZEH949SN"
}
firebase.initializeApp(firebaseConfig)

export const SampleForm = (props) => {

    let file
    let db = firebase.firestore();
    let thingsRef = db.collection('Samples')
    let url

    const { addSample } = useContext(SampleContext)
    const name = useRef(null)
    const description = useRef(null)

    const constructNewSample = () => {
        let fileRef = firebase.storage().ref("Audio/" + file.name)    
        fileRef.put(file).then(() => {
            async function getURL(){
            url = await fileRef.getDownloadURL()
            }
                getURL().then(() => {
                    addSample({
                        name: name.current.value,
                        description: description.current.value,
                        customerId: parseInt(localStorage.getItem("customer")),
                        rating: "",
                        url: url
                    })
                    thingsRef.add({
                        name: name.current.value,
                        description: description.current.value,
                        customerId: parseInt(localStorage.getItem("customer")),
                        url: url
                    })
                    .then(() => props.history.push("/browse"))
                })
            })
}

    return (
        <form className="sampleForm">
            <h1 class="heading">Upload Sample</h1>
                <div className="form-group1">
                    <label htmlFor="sampleName"><h3>Sample Name:</h3></label>
                    <input type="text" id="sampleName" ref={name} required autoFocus className="form-control" placeholder="Sample Name" />
                </div>
                <div className="form-group2">
                    <label htmlFor="sampleName"><h3>Description:</h3> </label>
                    <input type="text" id="sampleDescription" ref={description} required autoFocus className="form-control" placeholder="Enter Description Here" />
                </div>
                <div className="upload-group">
            <input class="button3" type="file" id="fileButton" 
                onChange={evt => {
                    file = evt.target.files[0]
                }}/>
            <button class="button4" type="submit"
                onClick={evt => {
                    console.log(name.current.value)
                    if(name.current.value != ""){
                        if(description.current.value != ""){
                    evt.preventDefault()
                    constructNewSample()}
                    else{window.alert("Please Enter a Description For Your Sample")}
                    }
                else{window.alert("Please Enter a Name For Your Sample")}
                }}
                class="button4">
                Add Sample
            </button>
            </div>
        </form>
    )
}