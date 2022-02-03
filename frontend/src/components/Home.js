import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Home() {
    const [isError, setError] = useState(false);

    const handleSubmit = async () => {
        const urlEl =  document.getElementById("url");
        const statusEl = document.getElementById("statusEl");
        const customCodeEl = document.getElementById("customCode");

        const createServerURL = "https://urlshortener-production-c464.up.railway.app/create"

        const url = urlEl.value
        const customCode = customCodeEl.value;
        urlEl.value = "";
        customCodeEl.value = "";

        const requestBody = customCode ? { url: url, customCode: customCode } : { url: url }

        if (isError) {
            statusEl.textContent = "";
            setError(false);
        }

        const request = await fetch(createServerURL, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const response = await request.json();
        if (response.code) statusEl.textContent = `Success! Your short URL is: https://urlshortener-production-c464.up.railway.app/${response.code}`; else statusEl.textContent = `An error occured! ${response.cause}`;

    }

    return (
        <div id="mainDiv">
            <h1 id="mainHeading">URL Shortener</h1>

            <h4 id="instructionsHeading">Enter a URL Below to shorten it!</h4>

            <input required type="url" id="url" autoComplete='off' placeholder='Enter a URL'/>
            <br />
            <br />

            <input type="text" maxLength="10" id="customCode" autoComplete='off' placeholder='Custom Code'/>
            <br />
            <br />

            <button id="submitButton" onClick={handleSubmit}>Submit</button>

            <p id="statusEl"></p>

            <Link to="/statistics" id="viewStatisticsRedirect">View Statistics</Link>
            
        </div>
    )
}

export default Home;