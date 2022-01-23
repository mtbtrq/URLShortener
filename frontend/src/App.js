import React, { useState } from 'react'

function App() {
    const [isError, setError] = useState(false);

    const handleSubmit = async () => {
        const urlEl =  document.getElementById("url");
        const statusEl = document.getElementById("statusEl");

        const createServerURL = "http://localhost:5000/create"

        const url = urlEl.value
        urlEl.value = "";
        
        // Copied from stack overflow :), I'm horrible at regex
        const urlMatchRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        const t = new RegExp(urlMatchRegex);

        const requestBody = {
            url: url
        }

        if (url.match(t)) {
            if (isError) {
                statusEl.textContent = "";
            }

            const request = await fetch(createServerURL, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })

            const response = await request.json();
            setError(false);
            statusEl.textContent = `Success! Your short URL is: http://localhost:5000/${response.code}`
        } else {
            statusEl.textContent = "Invalid URL Entered! Please try again!"
            setError(true);
        }
    }

    return (
        <div id="mainDiv">
            <h1 id="mainHeading">URL Shortener</h1>

            <h4 id="instructionsHeading">Enter a URL Below to shorten it!</h4>
            <input required type="url" pattern="https://.*" id="url" autoComplete='off'/>
            <br />
            <button id="submitButton" onClick={handleSubmit}>Submit</button>

            <p id="statusEl"></p>
        </div>
    )
}

export default App
