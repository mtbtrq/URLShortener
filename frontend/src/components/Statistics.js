import React from 'react';
import { Link } from "react-router-dom";

function Statistics() {
	const handleSubmit = async () => {
		const codeEl = document.getElementById("enterCodeElement");
		const code = codeEl.value;
		const statusEl = document.getElementById("statusEl");
		codeEl.value = "";

		statusEl.classList.remove("success");
		statusEl.classList.remove("error");

		statusEl.textContent = "";

		const config = require("../config.json");

		const serverURL = `${config.baseURL}/statistics`;

		const responseRaw = await fetch(serverURL, {
			method: "POST",
			body: JSON.stringify({ code: code }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});

		const response = await responseRaw.json();

		if (response.success) {
			statusEl.classList.add("success");
			statusEl.innerHTML = `<b>Views:</b> ${response.views}`;
			statusEl.innerHTML += `<p>URL: <a href="${response.url}" target="_blank">${response.url}</a></p>`;
		} else {
			statusEl.classList.add("error");
			statusEl.textContent = `An error occured! Cause: ${response.cause}`;
		};
	};

  return (
	<div id="mainDiv">
		<h1 id="mainHeading">Statistics</h1>

		<h4 id="instructionsHeading">Enter a code below to see the number of visits it has</h4>

		<input required type="text" id="enterCodeElement" autoComplete='off' placeholder='Enter a Code'/>
		<br />
		<br />

		<button id="submitButton" onClick={handleSubmit}>Submit</button>
		<br />

		<p id="statusEl"></p>

		<Link to="/" id="backHomeRedirect">Home</Link>
	</div>
  );
};

export default Statistics;