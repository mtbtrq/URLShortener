import React from "react";
import { Link } from "react-router-dom";

const config = require("../config.json")

const Admin = () => {
    const handleClick = async () => {
        const informationListEl = document.getElementById("informationList")
        const statusEl = document.getElementById("statusEl")
        
        statusEl.classList.remove("error")

        informationListEl.innerHTML = ""

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
        request = await request.json()

        statusEl.textContent = ""

        if (request.success) {
            statusEl.classList.add("success")
            statusEl.textContent = "Successfully logged in!"

            localStorage.setItem("username", document.getElementById("username").value)
            localStorage.setItem("password", document.getElementById("password").value)

            if (request.data.length > 0) {
                for (const entry of request.data) {
                    const item = document.createElement("li")
                    item.textContent = `Code: ${entry.code} | URL: ${entry.url} | Views: ${entry.views}`
                    informationListEl.appendChild(item)

                    document.getElementById("deleteButton").classList.remove("hidden");
                }
            } else {
                const item = document.createElement("li")
                item.textContent = "There have been no URLs shortened."
                informationListEl.appendChild(item)
            }
        } else {
            statusEl.classList.add("error")
            statusEl.textContent = `An error occured! Cause: ${request.cause}`
        }
    }

    const truncateDatabase = async () => {
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")

        const serverURL = `${config.baseURL}/delete`

        const dataBody = {
            username: username,
            password: password
        }

        let request = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(dataBody)
        })
        request = await request.json()

        if (request.success) { 
            const statusEl = document.getElementById("statusEl")
            statusEl.classList.add("success")
            statusEl.textContent = "Successfully cleared the database!"
            document.getElementById("informationList").innerHTML = "";
            document.getElementById("deleteButton").classList.add("hidden");
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

            <button onClick={truncateDatabase} id="deleteButton" className="hidden">Delete all URLs</button>
            <br />
            <br />

            <Link to="/">Home</Link>
        </div>
    );
};

export default Admin;