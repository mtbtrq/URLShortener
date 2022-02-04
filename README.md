

<h1>URL Shortener</h1>
<p>Might not be very efficient if you're hosting it on places like heroku and railway where they give you long links, but if you get a domain and everything, it works 😃👍</p>

<h3>How to run?</h3>

<ul>
	<li>To run the backend server, go into the <code>backend</code> folder, and run <code>install_deps.bat</code>. Once the installation of the required modules is complete, go into the <code>src</code> folder and run <code>run.bat</code>.</li>
	<li>To run the frontend server, go into the <code>frontend</code> folder, and run <code>install_deps.bat</code>. Once the required modules have been installed, open a new terminal window and run <code>npm start</code> in the same directory as the <code>package.json</code> file.</li>
</ul>

<h3>How to deploy API? - Heroku</h3>
<p>Limitations:</p>
<ul>
	<li>Will reset database, every time API restarts.</li>
	<li>API goes to sleep after a certain amount of inactivity.</li>
</ul>

<p>Procedure:</p>
<ul>
  <li>Download the <a  href="https://devcenter.heroku.com/articles/heroku-cli">heroku CLI</a></li>
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

<h3>How to deploy API? - Railway</h3>
<p>Procedure:</p>
<ul>
	<li>Create a github repository, and upload the files for frontend and backend in separate branches.</li>
	<li>Create an account at https://railway.app/, and link your github account (https://railway.app/account).</li>
	<li>Go to the dashboard (https://railway.app/dashboard), and click <code>New Project</code>.</li>
	<li>Click <code>Deploy From Repo</code></li>
	<li>Select the github repository you saved your code to, and select the correct branch</li>
	<li>Click <code>Deploy</code>, sit back, and relax</li>
	<li>Don't forget to change the baseURL in the <code>config.json</code> in the <code>frontend</code>'s <code>src</code> folder to your newly railway-hosted API URL.</li>
</ul>
