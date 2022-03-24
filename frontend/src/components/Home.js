import React from 'react'
import { Link } from "react-router-dom"

function Home() {
    const handleSubmit = async () => {
        const urlEl =  document.getElementById("url")
        const statusEl = document.getElementById("statusEl")
        const customCodeEl = document.getElementById("customCode")

        const config = require("../config.json")

        const createServerURL = `${config.baseURL}/create`

        statusEl.classList.remove("success")
		statusEl.classList.remove("error")

        const url = urlEl.value
        const customCode = customCodeEl.value
        urlEl.value = ""
        customCodeEl.value = ""

        const requestBody = customCode ? { url: url, customCode: customCode } : { url: url }

        statusEl.textContent = "Loading..."

        const request = await fetch(createServerURL, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        statusEl.textContent = ""

        const response = await request.json();
        if (response.code) { statusEl.classList.add("success"); statusEl.textContent = `Success! Your short URL is: ${config.baseURL}/u/${response.code}` } else { statusEl.classList.add("error"); statusEl.textContent = `An error occured! ${response.cause}` }
    }

    return (
        <div id="mainDiv">
            <h1 id="mainHeading">URL Shortener</h1>

            <h4 id="instructionsHeading">Enter a URL Below to shorten it!</h4>

            <input required type="url" id="url" autoComplete='off' placeholder='Enter a URL'/>
            <br />
            <br />

            <input type="text" maxLength="20" id="customCode" autoComplete='off' placeholder='Custom Code'/>
            <br />
            <br />

            <button id="submitButton" onClick={handleSubmit}>Submit</button>
            <br />

            <p id="statusEl"></p>

            <Link to="/statistics" id="viewStatisticsRedirect">View Statistics</Link>
            <Link to="/admin" id="adminRedirect">Admin Portal</Link>
            
        </div>
    )
}

export default Home