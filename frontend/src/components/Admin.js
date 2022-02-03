import React from "react";

const Admin = () => {
    const handleClick = async () => {
        const serverURL = "https://urlshortener-production-c464.up.railway.app/admin"

        const dataBody = {
            username: document.getElementById("password").value,
            password: document.getElementById("username").value
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
            const informationListEl = document.getElementById("informationList")

            for (const entry of request.data) {
                const item = document.createElement("li")
                item.textContent = `Code: ${entry.code} | URL: ${entry.url} | Views: ${entry.views}`
                informationListEl.appendChild(item)
            }
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

            <ul id="informationList"></ul>
        </div>
    );
};

export default Admin;