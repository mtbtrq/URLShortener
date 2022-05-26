import React from "react";
import { Link } from "react-router-dom";

const config = require("../config.json")

const Admin = () => {
    const handleClick = async () => {
        const linksListEl = document.getElementById("linksList")
        const statusEl = document.getElementById("statusEl")
        
        statusEl.classList.remove("error")

        linksListEl.innerHTML = ""

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
                    item.id = entry.code
                    item.textContent = `Code: ${entry.code}   |  URL: ${entry.url}   |   Views: ${entry.views}`
                    linksListEl.appendChild(item)

                    document.getElementById("deleteButton").classList.remove("hidden");
                    document.getElementById("deleteACodeText").classList.remove("hidden");
                    document.getElementById("codeElement").classList.remove("hidden");
                    document.getElementById("submitRemoveCodeButton").classList.remove("hidden");
                }
            } else {
                const item = document.createElement("li")
                item.textContent = "There have been no URLs shortened."
                linksListEl.appendChild(item)
            }
        } else {
            statusEl.classList.add("error")
            statusEl.textContent = `An error occured! Cause: ${request.cause}`
        }
    }

    const truncateDatabase = async () => {
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")

        const serverURL = `${config.baseURL}/truncate`

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
            document.getElementById("linksList").innerHTML = "";

            document.getElementById("deleteButton").classList.add("hidden");
            document.getElementById("deleteButton").classList.add("hidden");
            document.getElementById("deleteACodeText").classList.add("hidden");
            document.getElementById("codeElement").classList.add("hidden");
            document.getElementById("submitRemoveCodeButton").classList.add("hidden");

            const item = document.createElement("li")
            item.textContent = "There have been no URLs shortened."
            document.getElementById("linksList").appendChild(item)
        }
    }

    const handleRemoveCodeClick = async () => {
        const statusEl = document.getElementById("statusEl")
        statusEl.classList.remove("success")
        statusEl.classList.remove("error")
        const codeElement = document.getElementById("codeElement")
        const code = codeElement.value
        codeElement.value = ""

        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")

        const serverURL = `${config.baseURL}/delete`

        const dataBody = {
            username: username,
            password: password,
            code: code
        }

        let request = await fetch(serverURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(dataBody)
        })
        const response = await request.json()


        if (response.success) { 
            statusEl.classList.add("success")
            statusEl.textContent = "Successfully removed the code!"

            document.getElementById(code).remove()

            if (document.getElementById("linksList").children.length < 1) {
                document.getElementById("deleteButton").classList.add("hidden");
                document.getElementById("deleteButton").classList.add("hidden");
                document.getElementById("deleteACodeText").classList.add("hidden");
                document.getElementById("codeElement").classList.add("hidden");
                document.getElementById("submitRemoveCodeButton").classList.add("hidden");

                const item = document.createElement("li")
                item.textContent = "There have been no URLs shortened."
                document.getElementById("linksList").appendChild(item)
            }
        } else { 
            statusEl.classList.add("error")
            statusEl.textContent = response.cause
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

            <button onClick={handleClick} id="submitButton">Log in</button>
            <br />
            <br />

            <p id="statusEl"></p>

            <ul id="linksList"></ul>

            <p className="text hidden" id="deleteACodeText">Delete a Code</p>

            <input required type="text" id="codeElement" autoComplete="off" className="hidden" placeholder="Enter code" />
            <br />
            <br />

            <button className="hidden" onClick={handleRemoveCodeClick} id="submitRemoveCodeButton">Delete</button>
            <br />
            <br />

            <button onClick={truncateDatabase} id="deleteButton" className="hidden">Truncate Database</button>
            <br />
            <br />

            <Link to="/">Home</Link>
        </div>
    );
};

export default Admin;