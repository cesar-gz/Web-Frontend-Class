open a terminal, install dependencies in package.json

`npm install -g babel-cli`
`npm install --save-dev babel-core`
`npm install --save-dev babel-preset-es`
`npm install --save-dev parcel`
`npm install --save-dev browserify babelify watchify`

for windows enable scripts with:
`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`
windows users also need to delete a .babelrc file if it populates later, and delete `"main": "index.js",` from the package.json

run `babel app/scripts/src/app.js -o app/scripts/dist/main.js`

then run `npx parcel build app/scripts/src/app.js app/scripts/dist/main.js`

open a another terminal and `npm run dev` in chattrbox directory

run index.html on a localhost and check the console log to see if there is a printed "Hello ES6" message.
