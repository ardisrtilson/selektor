import React from "react"
import { Route } from "react-router-dom"
import { SampleProvider } from "./sample/SampleProvider"
import { SampleList } from "./sample/SampleList"
import { SampleFilter } from "./sample/SampleFilters"
import { SampleForm } from "./sample/SampleForm"
import { SampleDetails } from "./sample/SampleDetail"
import { SampleSearch } from "./sample/SampleSearch"
import { FriendsList } from "./friends/FriendsList"
import "./sample/Samples.css"

export const ApplicationViews = (props) => {
    return (
        <>

            <SampleProvider>

            <Route exact path="/" render={(props) => {
                            return <>
                                <div className="heading"><h1>Your Samples</h1></div>
                                <div class="filters">
                                <SampleSearch />
                                </div>
                                <SampleList history={props.history} />

                            </>
                        }} />

                        <Route exact path="/browse" render={(props) => {
                            return <>
                            <div class="heading"><h1>Browse</h1></div>
                            <div class="filters">
                                <SampleSearch />
                                <SampleFilter />
                                </div>
                                <SampleList history={props.history} />
                            </>
                        }} />
                        <Route exact path="/browse/friends" render={(props) => {
                            return <>
                                <div class="filters">
                                <SampleSearch />
                                <SampleFilter />
                                </div>
                                <SampleList history={props.history} />
                            </>
                        }} />

                        <Route path="/browse/:sampleId(\d+)" render={
                            props => <SampleDetails {...props} />
                        } />

                        <Route path="/upload" render={(props) => {
                            return <>
                            <SampleForm {...props} />
                            </>
                        }} />

                        <Route path="/friends" render={(props) => {
                            return <FriendsList {...props} />
                        }} />
            </SampleProvider>

            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("customer")
                    props.history.push("/login")
                }
            } />
        </>
    )
}