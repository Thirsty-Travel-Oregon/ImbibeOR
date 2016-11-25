# ImbibeOR
Javascript fueled message board for beverage travel in Oregon.

### Collaborators
  - Mugsy Carter
  - Tim Combs
  - Michael Freeman
  - John Gothro


### Project Functionality
  - This is a Code Fellows Project to create an http express server that uses mongoDB for persistent storage and retrieval and mongoose as the templating and validation layer then push 

  - The app also has an authentication system to sign-in users and allow specific types of users access to specified routes

  - The http server runs on localhost:3030

  [Live Site Here](http://Imbibe-OR.herokuapp.com/)


### Technologies used
  - node.js
  - MongoDB
  - Express
  - Mongoose
  - bcryptjs
  - Body-parser
  - Dotenv
  - Superagent
  - morgan
  - jQuery
  - ImageMapResizer
  - Page.js
  - Handlebars

  - deployed via Heroku

  - Make sure to run npm install from the directory root to install dependencies
  - Please refer to the package.json for more info


### Directions to run locally
  - Clone this repository
  - Set up database
    - [Download MongoDB](https://www.mongodb.com/download-center#community)
    - create a .env file - refer to .env.example
    - Start the database `mongod --dbpath [path to your MongoDB folder here]`
  - Set up project
    - Open new terminal window, `cd ImbibeOR` and `npm install`
    - Open another terminal window, `cd ImbibeOR` and type:
      ```
      $ npm start
      ``` 
    - Then open a browser window and navigate to the address localhost:303<your_port_number>

  - Please refer to the package.json for info about scripts


### Testing
  - Set Up
    - To run tests set up a test database in mongoDB: imbibeor-test
    - Start the database `mongod --dbpath [path to your MongoDB folder here]`
    - refer to .env.test for the port number
    - To run the test suite at cli at root of the project directory type:
      ```
      $ npm test
      ```
    - this will first run eslint - for more info look at .eslintrc
    - then mocha run unit tests and e2e tests
    

### Code Shape
  - The code has been vetted using eslint & Travis-CI

### Collborations/Questions/issues
  - Not currently looking for collaborators at this time
  - Always looking for suggestions
  - Any questions and concerns can be handled by opening an issue on the codebase

### License
  - Licensed under the ISC license - see LICENSE.md for more info
