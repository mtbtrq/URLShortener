import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Home() {
    const [isError, setError] = useState(false);

    const handleSubmit = async () => {
        const urlEl =  document.getElementById("url");
        const statusEl = document.getElementById("statusEl");
        const customCodeEl = document.getElementById("customCode");

        const createServerURL = "http://localhost:5000/create"

        const url = urlEl.value
        const customCode = customCodeEl.value;
        urlEl.value = "";
        customCodeEl.value = "";
        
        // Copied from stack overflow :), I'm horrible at regex
        const urlMatchRegex = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
        const t = new RegExp(urlMatchRegex);

        const requestBody = customCode ? { url: url, customCode: customCode } : { url: url }

        if (url.match(t)) {
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
            if (response.code) statusEl.textContent = `Success! Your short URL is: http://localhost:5000/${response.code}`; else statusEl.textContent = `An error occured! ${response.cause}`;
        } else {
            statusEl.textContent = "Invalid URL Entered! Please try again!";
            setError(true);
        }
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

            <button id="submitButton" onClick={handleSubmit}>Submit</button>

            <p id="statusEl"></p>

            <Link to="/statistics" id="viewStatisticsRedirect">View Statistics</Link>
            
        </div>
    )
}

export default Home;