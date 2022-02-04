import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    const handleClick = async () => {
        const informationListEl = document.getElementById("informationList")
        const statusEl = document.getElementById("statusEl")
        
        statusEl.classList.remove("error")

        informationListEl.innerHTML = ""
        const config = require("../config.json")

        const serverURL = `${config.baseURL}/admin`

        const dataBody = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }

        statusEl.textContent = "Loading..."

        let request = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(dataBody)
        })

        statusEl.textContent = ""
        
        request = await request.json()

        if (request.success) {
            for (const entry of request.data) {
                const item = document.createElement("li")
                item.textContent = `Code: ${entry.code} | URL: ${entry.url} | Views: ${entry.views}`
                informationListEl.appendChild(item)
            }
        } else {
            statusEl.classList.add("error")
            statusEl.textContent = `An error occured! Cause: ${request.cause}`
        }
    }

    return (
        <div id="mainDiv">
            <h1 id="mainHeading">Admin Portal</h1>

            <input required type="text" id="username" autoComplete="off" placeholder="Username" />
            <br />
            <br />

            <input required type="password" id="password" autoComplete="off" placeholder="Password" />
            <br />
            <br />

            <button onClick={handleClick} id="submitButton">Submit</button>
            <br />
            <br />

            <p id="statusEl"></p>

            <ul id="informationList"></ul>

            <Link to="/">Home</Link>
        </div>
    );
};

export default Admin;