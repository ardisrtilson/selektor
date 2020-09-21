import React from "react"
import { Route } from "react-router-dom"
import { SampleProvider } from "./sample/SampleProvider"
import { SampleList } from "./sample/SampleList"
import { SampleFilter } from "./sample/SampleFilters"
import { SampleForm } from "./sample/SampleForm"
import { SampleDetails } from "./sample/SampleDetail"
import { SampleSearch } from "./sample/SampleSearch"
import { FriendsList } from "./friends/FriendsList"

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
                                <SampleFilter />
                                <SampleList history={props.history} />
                            </>
                        }} />
                        <Route exact path="/browse/friends" render={(props) => {
                            return <>
                                <SampleSearch />
                                <SampleFilter />
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