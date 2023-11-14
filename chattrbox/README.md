# Set Up
open a terminal, install dependencies from package.json with command `npm install`

optionally install (if error messages occur):
`npm install -g babel-cli`
`npm install --save-dev babel-core`
`npm install --save-dev babel-preset-env`
`npm install --save-dev parcel`
`npm install --save-dev browserify babelify watchify`

for windows enable scripts with:
`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`

## Starting App
1) In a terminal, run `npm run build` or `npm run watch`
2) Run Web Sockets Server by opening another terminal and using the command `npm run dev`
3) run a localhost on port 5500 or 3000
4) go to localhost/chattrbox/app/index.html

## Chattrbox
- the ws-client module will manage the WebSockets communication for the client
- the dom module will display data to the UI and handle form submissions
- the app module will define the structure of messages and pass messages between ws-client and dom

ws-client.js has four responsibilities:
• connecting to the server
• performing initial setup when the connection is first opened
• forwarding incoming messages to their handlers
• sending outgoing messages
