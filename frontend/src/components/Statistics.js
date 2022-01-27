import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Statistics() {
	const [isError, setError] = useState(false);
	
	const handleSubmit = async () => {
		const codeEl = document.getElementById("enterCodeElement");
		const code = codeEl.value;
		const statusEl = document.getElementById("statusEl");
		codeEl.value = "";

		if (!isError) {
			statusEl.textContent = "";
		}

		const serverURL = "http://localhost:5000/statistics"

		const requestBody = {
			code: code
		}

		const requestRaw = await fetch(serverURL, {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});

		const request = await requestRaw.json();

		if (request.success) {
			statusEl.innerHTML = `<b>Views:</b> ${request.views}`;
			statusEl.innerHTML += `<p><b>URL:</b> ${request.url}</p>`;
			setError(false);
		} else {
			statusEl.textContent = `An error occured! Cause: ${request.cause}`
			setError(true)
		}
	}

  return (
	<div id="mainDiv">
		<h1 id="mainHeading">Statistics</h1>

		<h4 id="instructionsHeading">Enter a code below to see the number of visits it has</h4>

		<input required type="text" id="enterCodeElement" autoComplete='off' placeholder='Enter a Code'/>
		<br />

		<button id="submitButton" onClick={handleSubmit}>Submit</button>

		<p id="statusEl"></p>

		<Link to="/">Home</Link>
	</div>
  );
};

export default Statistics;