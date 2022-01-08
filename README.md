<h1>URL Shortener</h1>
<p>Might not be very efficient if you're hosting it on places like heroku where they give you long links, but if you get a domain and everything, it works 😃👍</p>

<h3>How to run?</h3>

<li>Run <code>install_deps.bat</code></li>
<li>Go into the <code>src</code> folder and run <code>run.bat</code></li>
<li>Send a post request to <code>/create</code> in the json format.  With the url being in the "url" property.</li>
<li>The server will return the code, append the code to the end of the URL that the server is hosted on, e.g: <code>http://localhost:5000/(your code here)</code> or <code>http://example.com/(your code here)</code></li>
