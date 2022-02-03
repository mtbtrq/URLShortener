<h1>URL Shortener</h1>
<p>Might not be very efficient if you're hosting it on places like heroku and railway where they give you long links, but if you get a domain and everything, it works 😃👍</p>

<h3>How to run?</h3>

<li>Run <code>install_deps.bat</code></li>
<li>Go into the <code>src</code> folder and run <code>run.bat</code></li>
<li>Send a post request to <code>/create</code> in the json format.  With the url being in the "url" property.</li>
<li>The server will return the code, append the code to the end of the URL that the server is hosted on, e.g: <code>http://localhost:5000/(your code here)</code> or <code>http://example.com/(your code here)</code></li>

<h3>How to deploy API?</h3>
<ul>
  <li>Download the <a  href="https://devcenter.heroku.com/articles/heroku-cli">heroku CLI</a></kli>
  <li>Download <a href="https://git-scm.com/downloads">Git</a> (Make sure to 'add to PATH')</li>
  <li>Once downloaded, open up your terminal and type <code>heroku login</code></li>
  <li>Make a new file called <code>Procfile</code> (with no extension) and in that file, type <code>web: node index.js</code></li>
  <li>Make sure to change the port of your express API to <code>process.env.PORT</code></li>
  <li>You must have the <code>node_modules</code> folder when deploying.</li>
  <li>Open a new terminal and navigate to the directory with the API in it.</li>
  <li>Type <code>git init</code></li>
  <li>Type <code>git add .</code></li>
  <li>Type <code>git commit -m "anything you want, or you could just leave this as is"</code></li>
  <li>Type <code>heroku create</code> or <code>heroku create {any name you would like</code></li>
  <li>Then type <code>git push heroku main</code>, if that doesn't work type <code>git push heroku master</code></li>
</ul>
