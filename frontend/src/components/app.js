import React from "react"
import { render } from "react-dom";
import HomePage from "./HomePage"

export default function App(props) {
    return (
        <div className="center">
            <HomePage />
        </div>)
}

const appDiv = document.getElementById("app");
// render the App component inside appDiv
render(<App />, appDiv)