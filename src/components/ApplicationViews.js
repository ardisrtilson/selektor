import React from "react"
import { Route } from "react-router-dom"
import { SampleProvider } from "./sample/SampleProvider"
import { SampleList } from "./sample/SampleList"
import { SampleForm } from "./sample/SampleForm"
import { SampleDetails } from "./sample/SampleDetail"
import { SampleSearch } from "./sample/SampleSearch"

export const ApplicationViews = (props) => {
    return (
        <>

            <SampleProvider>

            <Route exact path="/" render={(props) => {
                            return <>
                                <SampleSearch />
                                <SampleList history={props.history} />
                            </>
                        }} />

                        <Route exact path="/browse" render={(props) => {
                            return <>
                                <SampleSearch />
                                <SampleList history={props.history} />
                            </>
                        }} />

                        <Route path="/browse/:sampleId(\d+)" render={
                            props => <SampleDetails {...props} />
                        } />

                        <Route path="/upload" render={(props) => {
                            return <SampleForm {...props} />
                        }} />

            </SampleProvider>

            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("kennel_customer")
                    props.history.push("/login")
                }
            } />
        </>
    )
}