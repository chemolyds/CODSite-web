A website for the USNCO discord server

# Setup
## Requirements
 - Node.js
 - Internet Connection

## Package Installation
1. Open terminal in root directory
2. Run `npm run install-all` 
3. Run `npm run audit-all` 

Optionally, just run `npm run install-audit` on the root directory.

## Running Backend ONLY
1. Open terminal in root directory
2. Run `nodemon server.js`

This opens up the server on port 3001.

## Running Frontend ONLY
1. Open terminal in client directory
2. CD to client folder
3. Run `npm start`

This opens the development app on port 3000

## Running both at once
1. Open terminal in root directory
2. Run `npm run start-dev`

You may have to wait for hte development app to finish initializing.

# Environment and Stuff
## Custom NPM scripts
Several scripts were written for quality of life
 - `install-all` installs both server-side and client-side packages
 - `audit-all` audits both server-side and client-side packages
 - `install-audit` runs both `install-all` and `audit-all` for you
 - `start-dev` starts the development server

## Environment Variables
### Server
Server config files can be found in `/server/config/` folder. `config.js` contains the current Mongo connection uri. `sampleconfig.js` shows what the file should look like.
### Client
The `client` folder contains a `.env` file containing `SKIP_PREFLIGHT_CHECK=true`
### Heroku
Heroku config variables can be set in the heroku manager or through the heroku CLI.  
`NODE_MODULES_CACHE` is set to `true` and `NPM_CONFIG_PRODUCTION` is set to `false`.  
This may not be needed, but it is left there so it doesn't break anything.
