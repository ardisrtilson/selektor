import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { FirestoreProvider } from "@react-firebase/firestore"
import firebase from 'firebase'
import "./Selektor.css"

const config = {
    apiKey: "API_KEY",
    projectId: "PROJECT_ID",
    databaseURL: "DATABASE_URL",
    authDomain: "AUTH_DOMAIN",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID"
  };

export const Selektor = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("kennel_customer")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)

const App = () => {
    return (
      <FirestoreProvider {...config} firebase={firebase}>
        <div>This is my app</div>
      </FirestoreProvider>
    );
  };