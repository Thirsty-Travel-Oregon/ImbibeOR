const express = require('express');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./errorHandler');
const ensureAuth = require('./auth/ensureAuth')();
const ensureRole = require('./auth/ensureRoles');

const auths = require('./routes/auths');
const users = require('./routes/users');
const threads = require('./routes/threads');
const remarks = require('./routes/remarks');
const drinkTypes = require('./routes/drinkTypes');
const regions = require('./routes/regions');


const publicDir = path.join(__dirname, '../public');

const app = express();

//home routes
app.use(express.static(publicDir));

const indexHtml = path.join( publicDir, 'index.html' );
console.log('indexHtml is ', indexHtml);
// app.get('/', (req,res) => res.sendFile(indexHtml))



app.use(morgan('dev')); // use for logging

app.use('/api/auth', auths); // sign-up and sign-in are here

// the USERS and ROLES routes are only available to admin and moderator roles.
app.use('/api/users', users);
app.use('/api/threads', threads);
app.use('/api/remarks', remarks);
app.use('/api/regions', regions);
app.use('/api/drinkTypes', drinkTypes);

// the USERS and ROLES routes are only available to admin and moderator roles.
app.use('/api/users', ensureAuth, ensureRole(['admin']), users);

// const index = path.resolve('../public/index.html');

app.get('*', function(req, res){
  console.log('routing');
  res.sendFile(indexHtml);
});


// {root:__dirname + '/'}
app.use(errorHandler);

module.exports = app;
